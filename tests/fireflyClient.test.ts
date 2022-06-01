/* eslint-disable no-undef */
import chai, { assert, expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { setTimeout } from "timers/promises";

import {
  Networks,
  MARKET_SYMBOLS,
  ORDER_STATUS,
  FireflyClient,
  bnStrToBaseNumber,
  ORDER_SIDE,
  PlaceOrderResponse,
  GetMarketRecentTradesResponse,
  GetPositionResponse,
  GetUserTradesResponse,
  GetAccountDataResponse,
} from "../src/index";

chai.use(chaiAsPromised);

const testAcctKey =
  "4d6c9531e0042cc8f7cf13d8c3cf77bfe239a8fed95e198d498ee1ec0b1a7e83";
const testAcctPubAddr = "0xFEa83f912CF21d884CDfb66640CfAB6029D940aF";

let client: FireflyClient;

describe("FireflyClient", () => {
  beforeEach(() => {
    client = new FireflyClient(Networks.TESTNET, testAcctKey);
  });

  afterEach(() => {
    client.sockets.close();
  });

  it("should initialize the client", async () => {
    expect(client).to.be.not.eq(undefined);
  });

  it("should return public address of account", async () => {
    expect(client.getPublicAddress()).to.be.equal(testAcctPubAddr);
  });

  describe("Market", () => {
    it("should add DOT-PERP market", async () => {
      expect(client.addMarket(MARKET_SYMBOLS.DOT)).to.be.equal(true);
    });

    it("should add DOT-PERP market with custom orders contract address", async () => {
      expect(
        client.addMarket(
          MARKET_SYMBOLS.DOT,
          "0x36AAc8c385E5FA42F6A7F62Ee91b5C2D813C451C"
        )
      ).to.be.equal(true);
    });

    it("should throw error as there is no market by name of TEST-PERP in deployedContracts", async () => {
      assert.throws(
        () => {
          client.addMarket("TEST-PERP");
        },
        Error,
        `Contract "Orders" not found in deployedContracts.json for network id 1297`
      );
    });

    it("should add market despite not existing in deployed contracts", async () => {
      expect(
        client.addMarket(
          "TEST-PERP",
          "0x36AAc8c385E5FA42F6A7F62Ee91b5C2D813C451C"
        )
      ).to.be.equal(true);
    });

    it("should return False as DOT-PERP market is already added", async () => {
      expect(client.addMarket(MARKET_SYMBOLS.DOT)).to.be.equal(true);
      expect(client.addMarket(MARKET_SYMBOLS.DOT)).to.be.equal(false);
    });

    it("should remove the DOT market", async () => {
      expect(client.addMarket(MARKET_SYMBOLS.DOT)).to.be.equal(true);
      expect(client.removeMarket(MARKET_SYMBOLS.DOT)).to.be.equal(true);
    });

    it("should return false when trying to remove a non-existent market", async () => {
      expect(client.removeMarket(MARKET_SYMBOLS.DOT)).to.be.equal(false);
    });
  });

  describe("Balance", () => {
    it("should get 10K Test USDCs", async () => {
      expect(await client.mintTestUSDT()).to.be.equal(true);
      expect(
        bnStrToBaseNumber(await client.getUSDTBalance())
      ).to.be.greaterThanOrEqual(10000);
    });

    it("should move 1 USDC token to Margin Bank", async () => {
      expect(await client.depositToMarginBank(1)).to.be.equal(true);
      expect(
        bnStrToBaseNumber(await client.getMarginBankBalance())
      ).to.be.greaterThanOrEqual(1);
    });

    it("should withdraw 1 USDC token from Margin Bank", async () => {
      expect(await client.withdrawFromMarginBank(1)).to.be.equal(true);
    });

    it("should move all USDC token from Margin Bank", async () => {
      expect(await client.withdrawFromMarginBank()).to.be.equal(true);
      expect(await client.getMarginBankBalance()).to.be.eql("0");
    });
  });

  describe("Create/Place/Post Orders", () => {
    beforeEach(async () => {
      client.addMarket(MARKET_SYMBOLS.DOT);
    });

    it("should put 10K in margin bank", async () => {
      await client.mintTestUSDT();
      await client.depositToMarginBank(10000);
    });

    it("should throw error as DOT market is not added to client", async () => {
      await expect(
        client.createSignedOrder({
          symbol: MARKET_SYMBOLS.BTC,
          price: 0,
          quantity: 0.1,
          side: ORDER_SIDE.SELL,
        })
      ).to.be.eventually.rejectedWith(
        "Provided Market Symbol(BTC-PERP) is not added to client library"
      );
    });

    it("should create signed order", async () => {
      const signedOrder = await client.createSignedOrder({
        symbol: MARKET_SYMBOLS.DOT,
        price: 0,
        quantity: 0.1,
        side: ORDER_SIDE.SELL,
      });

      expect(signedOrder.leverage).to.be.equal(1);
      expect(signedOrder.price).to.be.equal(0);
      expect(signedOrder.quantity).to.be.equal(0.1);
    });

    it("should place a LIMIT SELL order on exchange", async () => {
      const signedOrder = await client.createSignedOrder({
        symbol: MARKET_SYMBOLS.DOT,
        price: 11,
        quantity: 0.5,
        side: ORDER_SIDE.SELL,
      });

      const response = await client.placeSignedOrder({ ...signedOrder });
      expect(response.ok).to.be.equal(true);
    });

    it("should place a MARKET BUY order on exchange", async () => {
      const signedOrder = await client.createSignedOrder({
        symbol: MARKET_SYMBOLS.DOT,
        price: 0,
        quantity: 0.5,
        side: ORDER_SIDE.BUY,
      });
      const response = await client.placeSignedOrder({ ...signedOrder });
      expect(response.ok).to.be.equal(true);
    });

    it("should post a LIMIT order on exchange", async () => {
      const response = await client.postOrder({
        symbol: MARKET_SYMBOLS.DOT,
        price: 11,
        quantity: 0.5,
        side: ORDER_SIDE.BUY,
      });
      expect(response.ok).to.be.equal(true);
    });
  });

  describe("Cancel Orders", () => {
    beforeEach(async () => {
      client.addMarket(MARKET_SYMBOLS.DOT);
    });

    it("should cancel the open order", async () => {
      const signedOrder = await client.createSignedOrder({
        symbol: MARKET_SYMBOLS.DOT,
        price: 11,
        quantity: 0.5,
        side: ORDER_SIDE.SELL,
      });
      const response = await client.placeSignedOrder({ ...signedOrder });

      const cancelSignature = await client.createOrderCancellationSignature({
        symbol: MARKET_SYMBOLS.DOT,
        hashes: [response.response.data.hash],
      });

      const cancellationResponse = await client.placeCancelOrder({
        symbol: MARKET_SYMBOLS.DOT,
        hashes: [response.response.data.hash],
        signature: cancelSignature,
      });

      expect(cancellationResponse.ok).to.be.equal(true);
    });

    it("should get Invalid Order Signature error", async () => {
      const signedOrder = await client.createSignedOrder({
        symbol: MARKET_SYMBOLS.DOT,
        price: 11,
        quantity: 0.5,
        side: ORDER_SIDE.SELL,
      });
      const response = await client.placeSignedOrder({ ...signedOrder });

      const cancellationResponse = await client.placeCancelOrder({
        symbol: MARKET_SYMBOLS.DOT,
        hashes: [response.response.data.hash],
        signature: "0xSomeRandomStringWhichIsNotACorrectSignature",
      });

      expect(cancellationResponse.ok).to.be.equal(false);
      expect(cancellationResponse.response.message).to.be.equal(
        "Invalid Order Signature."
      );
    });

    it("should post a cancel order on exchange", async () => {
      const response = await client.postOrder({
        symbol: MARKET_SYMBOLS.DOT,
        price: 15,
        quantity: 0.5,
        side: ORDER_SIDE.SELL,
      });
      expect(response.ok).to.be.equal(true);

      const cancelResponse = await client.postCancelOrder({
        symbol: MARKET_SYMBOLS.DOT,
        hashes: [response?.data?.hash as string],
      });

      expect(cancelResponse.ok).to.be.equal(true);
    });

    it("should cancel all open orders", async () => {
      const response = await client.cancelAllOpenOrders(MARKET_SYMBOLS.DOT);
      expect(response.ok).to.be.equal(true);

      const openOrders = await client.getUserOrders({
        symbol: MARKET_SYMBOLS.DOT,
        statuses: ORDER_STATUS.OPEN,
      });

      expect(openOrders.response.data.length).to.be.equal(0);
    });
  });

  describe("Get User Orders", () => {
    it("should get all open orders", async () => {
      const data = await client.getUserOrders({
        statuses: ORDER_STATUS.OPEN,
        symbol: MARKET_SYMBOLS.DOT,
      });
      expect(data.ok).to.be.equals(true);
      expect(data.response.data.length).to.be.greaterThanOrEqual(0);
    });

    it("should get all cancelled orders", async () => {
      const data = await client.getUserOrders({
        statuses: ORDER_STATUS.CANCELLED,
        symbol: MARKET_SYMBOLS.DOT,
      });
      expect(data.response.data.length).to.be.greaterThanOrEqual(2);
    });

    it("should get 1 cancelled orders", async () => {
      const data = await client.getUserOrders({
        statuses: ORDER_STATUS.CANCELLED,
        symbol: MARKET_SYMBOLS.DOT,
        pageSize: 1,
      });
      expect(data.response.data.length).to.be.equals(1);
    });

    it("should get 0 expired orders as page 10 does not exist for expired orders", async () => {
      const data = await client.getUserOrders({
        statuses: ORDER_STATUS.EXPIRED,
        symbol: MARKET_SYMBOLS.DOT,
        pageNumber: 10,
      });
      expect(data.response.data.length).to.be.equals(0);
    });
  });

  describe("Get User Position", () => {
    beforeEach(async () => {
      client.addMarket(MARKET_SYMBOLS.DOT);
    });

    it("should return zero open positions for the user", async () => {
      const clientTemp = new FireflyClient(
        Networks.TESTNET,
        "20049f9e228fc02b924e022533b92ddc07d0a1f125845d2caca14b8010943f63"
      );
      clientTemp.addMarket(MARKET_SYMBOLS.DOT);

      const response = await clientTemp.getUserPosition({});
      expect(response.ok).to.be.equal(true);
      expect(response.response.data.length).to.be.equal(0);

      clientTemp.sockets.close();
    });

    it("should return no open position for user against BTC-PERP market", async () => {
      const clientTemp = new FireflyClient(
        Networks.TESTNET,
        "20049f9e228fc02b924e022533b92ddc07d0a1f125845d2caca14b8010943f63"
      );
      clientTemp.addMarket(MARKET_SYMBOLS.DOT);

      const response = await clientTemp.getUserPosition({});
      expect(response.ok).to.be.equal(true);
      expect(response.response.data.length).to.be.equal(0);
      clientTemp.sockets.close();
    });

    it("should get user's DOT-PERP Position", async () => {
      const response = await client.getUserPosition({
        symbol: MARKET_SYMBOLS.DOT,
      });
      expect(response.response.data.symbol).to.be.equal(MARKET_SYMBOLS.DOT);
    });

    it("should get all open positions for the user across all markets", async () => {
      const response = await client.getUserPosition({});
      expect(response.response.data.length).to.be.greaterThanOrEqual(1);
    });
  });

  describe("Get User Trades", () => {
    beforeEach(async () => {
      client.addMarket(MARKET_SYMBOLS.DOT);
    });

    it("should return zero trades for the user", async () => {
      const clientTemp = new FireflyClient(
        Networks.TESTNET,
        "20049f9e228fc02b924e022533b92ddc07d0a1f125845d2caca14b8010943f63"
      );
      clientTemp.addMarket(MARKET_SYMBOLS.DOT);

      const response = await clientTemp.getUserTrades({});
      expect(response.ok).to.be.equal(true);
      expect(response.response.data.length).to.be.equal(0);
      clientTemp.sockets.close();
    });

    it("should get user's DOT-PERP Trades", async () => {
      const response = await client.getUserTrades({
        symbol: MARKET_SYMBOLS.DOT,
      });
      expect(response.response.data.length).to.be.greaterThanOrEqual(1);
    });
  });

  describe("Get Market Orderbook", () => {
    it("should get DOT orderbook with best ask and bid", async () => {
      const response = await client.getOrderbook({
        symbol: MARKET_SYMBOLS.DOT,
        limit: 1,
      });
      expect(response.ok).to.be.equal(true);
      expect(response?.data?.limit).to.be.equal(1);
      expect(response?.data?.symbol).to.be.equal(MARKET_SYMBOLS.DOT);
    });

    it("should get no orderbook data as market for DOGE-PERP does not exist", async () => {
      const response = await client.getOrderbook({
        symbol: "DODGE-PERP",
        limit: 1,
      });
      expect(response.ok).to.be.equal(false);
    });
  });

  it("should get User Account Data", async () => {
    const response = await client.getUserAccountData(MARKET_SYMBOLS.DOT);
    expect(response.ok).to.be.equal(true);
  });

  it("should get 2 Transaction History records for user", async () => {
    const response = await client.getUserTransactionHistory({
      symbol: MARKET_SYMBOLS.DOT,
      pageSize: 2,
      pageNumber: 1,
    });
    expect(response.ok).to.be.equal(true);
    expect(response.data?.length).to.be.equal(2);
  });

  it("should get recent market trades of DOT-PERP Market", async () => {
    const response = await client.getMarketRecentTrades({
      symbol: MARKET_SYMBOLS.DOT,
    });
    expect(response.ok).to.be.equal(true);
  });

  it("should get candle stick data", async () => {
    const response = await client.getMarketCandleStickData({
      symbol: MARKET_SYMBOLS.DOT,
      interval: "1m",
    });
    expect(response.ok).to.be.equal(true);
  });

  it("should get exchange info for DOT Market", async () => {
    const response = await client.getExchangeInfo(MARKET_SYMBOLS.DOT);
    expect(response.ok).to.be.equal(true);
    expect(response.data?.symbol).to.be.equal(MARKET_SYMBOLS.DOT);
  });

  it("should get exchange info for all markets", async () => {
    const response = await client.getExchangeInfo();
    expect(response.ok).to.be.equal(true);
    expect(response.response.data.length).to.be.greaterThanOrEqual(1);
  });

  it("should get market data for DOT Market", async () => {
    const response = await client.getMarketData(MARKET_SYMBOLS.DOT);
    expect(response.ok).to.be.equal(true);
  });

  it("should get market meta info for DOT Market", async () => {
    const response = await client.getMarketMetaInfo(MARKET_SYMBOLS.DOT);
    expect(response.ok).to.be.equal(true);
  });

  it("should get status of exchange to be alive", async () => {
    const response = await client.getExchangeStatus();
    expect(response.ok).to.be.equal(true);
    expect(response.data?.isAlive).to.be.equal(true);
  });

  describe("Sockets", () => {
    beforeEach(async () => {
      await client.sockets.open();
      await client.addMarket(MARKET_SYMBOLS.DOT);
      await client.sockets.subscribeGlobalUpdatesBySymbol(MARKET_SYMBOLS.DOT);
      await client.sockets.subscribeUserUpdateByAddress(
        client.getPublicAddress()
      );
    });

    it("should receive an event for orderbook update when an order is placed on exchange", (done) => {
      const callback = ({ orderbook }: any) => {
        expect(orderbook.symbol).to.be.equal(MARKET_SYMBOLS.DOT);
        done();
      };

      client.sockets.onOrderBookUpdate(callback);

      // wait for 1 sec as room might not had been subscribed
      setTimeout(1000).then(() => {
        client.postOrder({
          symbol: MARKET_SYMBOLS.DOT,
          price: 15,
          quantity: 0.5,
          side: ORDER_SIDE.SELL,
        });
      });
    });

    it("should receive an event when a trade is performed", (done) => {
      const callback = ({
        trades,
      }: {
        trades: GetMarketRecentTradesResponse[];
      }) => {
        expect(trades[0].symbol).to.be.equal(MARKET_SYMBOLS.DOT);
        done();
      };

      client.sockets.onRecentTrades(callback);

      // wait for 1 sec as room might not had been subscribed
      setTimeout(1000).then(() => {
        client.postOrder({
          symbol: MARKET_SYMBOLS.DOT,
          price: 0,
          quantity: 0.5,
          side: ORDER_SIDE.BUY,
        });
      });
    });

    it("should receive order update event", (done) => {
      const callback = ({ order }: { order: PlaceOrderResponse }) => {
        expect(order.symbol).to.be.equal(MARKET_SYMBOLS.DOT);
        done();
      };

      client.sockets.onUserOrderUpdate(callback);

      // wait for 1 sec as room might not had been subscribed
      setTimeout(1000).then(() => {
        client.postOrder({
          symbol: MARKET_SYMBOLS.DOT,
          price: 12,
          quantity: 0.5,
          side: ORDER_SIDE.SELL,
        });
      });
    });

    it("should receive position update event", (done) => {
      const callback = ({ position }: { position: GetPositionResponse }) => {
        expect(position.userAddress).to.be.equal(
          client.getPublicAddress().toLocaleLowerCase()
        );
        done();
      };

      client.sockets.onUserPositionUpdate(callback);

      // wait for 1 sec as room might not had been subscribed
      setTimeout(1000).then(() => {
        client.postOrder({
          symbol: MARKET_SYMBOLS.DOT,
          price: 0,
          quantity: 0.5,
          side: ORDER_SIDE.BUY,
        });
      });
    });

    it("should receive user update event", (done) => {
      const callback = ({ trade }: { trade: GetUserTradesResponse }) => {
        expect(trade.maker).to.be.equal(false);
        expect(trade.symbol).to.be.equal(MARKET_SYMBOLS.DOT);
        done();
      };

      client.sockets.onUserUpdates(callback);

      // wait for 1 sec as room might not had been subscribed
      setTimeout(1000).then(() => {
        client.postOrder({
          symbol: MARKET_SYMBOLS.DOT,
          price: 0,
          quantity: 0.5,
          side: ORDER_SIDE.BUY,
        });
      });
    });

    it("should receive user account update event", (done) => {
      const callback = ({
        accountData,
      }: {
        accountData: GetAccountDataResponse;
      }) => {
        expect(accountData.address).to.be.equal(
          client.getPublicAddress().toLocaleLowerCase()
        );
        done();
      };

      client.sockets.onUserAccountDataUpdate(callback);

      // wait for 1 sec as room might not had been subscribed
      setTimeout(1000).then(() => {
        client.postOrder({
          symbol: MARKET_SYMBOLS.DOT,
          price: 0,
          quantity: 0.5,
          side: ORDER_SIDE.BUY,
        });
      });
    });
  });
});
