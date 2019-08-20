const Crosschain = artifacts.require("Crosschain");

const ZERO_HASH = '0x00000000000000000000000000000000',
      ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const {b, getTxFixture, txParamsObject} = require("./utils");
const ONE_INPUT_2_OUTPUTS = getTxFixture("./tx-fixtures/1-input-2-outputs-first-p2pkh.json")

contract('Crosschain', ([firstAccount, ..._]) => {
  let instance;
  beforeEach(async () => {
    instance = await Crosschain.new();
  });

  describe('#submitEventProof', async () => {
    it('saves a valid event', async () => {
        const tx = txParamsObject(ONE_INPUT_2_OUTPUTS);
        const event = {amount: 1, txID: ZERO_HASH, receivingPKH: ZERO_HASH};
        await instance.submitEventProof(event, {transaction:tx});
        assert.ok(await instance.eventExists(event));
    });

    it('does not remember an event which was never submitted with a proof', async () => {
        const event = {amount: 1, txID: ZERO_HASH, receivingPKH: ZERO_HASH};
        assert.ok(!(await instance.eventExists(event)));
    });
  });
});
