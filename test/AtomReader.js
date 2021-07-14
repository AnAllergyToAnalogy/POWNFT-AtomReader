const { expect, assert } = require("chai");
const {parseHash, getIons} = require("../metadata");
const {hashes}    = require("../hashes");

function randomHash(){
  const library = '0123456789abcdef';
  let h = '';
  for(let i = 0; i < 64; i++){
    let j = Math.floor(Math.random()*(library.length));
    h += library[j];
  }
  return h;
}

function generate_tokenId(min,max){
  return min + Math.round(Math.random() * (max - min));
}


let powNFTplaceholder;

describe("AtomReader", function() {
  before(async function(){
      const POWNFTplaceholder = await ethers.getContractFactory("POWNFTplaceholder");
      powNFTplaceholder = await POWNFTplaceholder.deploy();
      await powNFTplaceholder.deployed();

      for(let i = 0; i < hashes.length; i++){
        powNFTplaceholder.pushHash(hashes[i]);
      }
  });

  //TODO test all funcs

  it("Returns correct getAtomicNumber for all known hashes", async function(){
    const AtomReader = await ethers.getContractFactory("AtomReader");
    const atomReader = await AtomReader.deploy(powNFTplaceholder.address);
    await atomReader.deployed();

    let totalSupply = parseInt(await powNFTplaceholder.totalSupply());
    let matches = 0;
    let attempts = totalSupply;

    for(let i = 0; i < attempts; i++){
      let id = i+1;
      // let hash = "0x"+randomHash();
      let hash = await powNFTplaceholder.hashOf(id);

      let metadata = parseHash(id,hash);

      let expected = metadata.atomicNumber;
      // let bytes = metadata.atomicBytes;

      let reported = await atomReader.getAtomicNumber(id);
      // let reported = await atomReader.inferredBytes(hash);

      if(expected.toString() === reported.toString()){
          matches++;
      }else{
        console.log('fail:');
        console.log("    ",expected.toString(),reported.toString());
      }
    }
    // assert.equal(true,true);
    assert.equal(matches,attempts);

  });

  it("returns correct getIonCharge for all known hashes", async function(){
    const AtomReader = await ethers.getContractFactory("AtomReader");
    const atomReader = await AtomReader.deploy(powNFTplaceholder.address);
    await atomReader.deployed();

    let totalSupply = parseInt(await powNFTplaceholder.totalSupply());
    let matches = 0;
    let attempts = totalSupply;

    for(let i = 0; i < attempts; i++) {
      let id = i+1;
      let hash = await powNFTplaceholder.hashOf(id);


      let metadata = parseHash(id, hash);

      let expected = metadata.ion_charge;

      // let atomicNumber = await atomReader.getAtomicNumber(id);

      let reported = await atomReader.getIonCharge(id);

      // console.log('>>');
      // console.log(expected,reported);

      if(expected.toString() === reported.toString()){
        matches++;
        // console.log(matches);
      }else{
        console.log('fail:');
        console.log("    ",expected.toString(),reported.toString());
      }
    }
    assert.equal(matches,attempts);
  });

  it("returns correct getAtomData for all known hashes", async function(){
    const AtomReader = await ethers.getContractFactory("AtomReader");
    const atomReader = await AtomReader.deploy(powNFTplaceholder.address);
    await atomReader.deployed();

    let totalSupply = parseInt(await powNFTplaceholder.totalSupply());
    let matches = 0;
    let attempts = totalSupply;

    for(let i = 0; i < attempts; i++) {
      let id = i+1;
      let hash = await powNFTplaceholder.hashOf(id);

      let metadata = parseHash(id, hash);

      let expected_atomicNumber = metadata.atomicNumber;
      let expected_ionCharge = metadata.ion_charge;

      let reported = await atomReader.getAtomData(id);

      if(
          (expected_atomicNumber.toString() === reported.atomicNumber.toString())
            &&
          (expected_ionCharge.toString() === reported.ionCharge.toString())
      ){
        matches++;
      }else{
        console.log('fail:');
        console.log("    ",expected_atomicNumber.toString(),reported.atomicNumber.toString());
        console.log("    ",expected_ionCharge.toString(),reported.ionCharge.toString());
      }
    }
    assert.equal(matches,attempts);
  });

  it("returns correct getIons for all 118 atomicNumbers", async function(){
    const AtomReader = await ethers.getContractFactory("AtomReader");
    const atomReader = await AtomReader.deploy(powNFTplaceholder.address);
    await atomReader.deployed();

    let matches = 0;
    let attempts = 119;

    for(let atomicNumber = 0; atomicNumber < attempts; atomicNumber++) {

      let ions_expected = getIons(atomicNumber);
      let ions_reported = await atomReader.getIons(atomicNumber);

      let allMatch = true;
      for(let i = 0; i < ions_expected.length; i++){
        allMatch = allMatch && (ions_expected[i] === ions_reported[i]);
      }
      if(allMatch) matches++;
    }
    assert.equal(matches,attempts);
  });

  it("returns correct canIonise for all atomicNumbers", async function(){
    const AtomReader = await ethers.getContractFactory("AtomReader");
    const atomReader = await AtomReader.deploy(powNFTplaceholder.address);
    await atomReader.deployed();

    let matches = 0;
    let attempts = 119;

    for(let atomicNumber = 0; atomicNumber < attempts; atomicNumber++) {

      let ions = getIons(atomicNumber);
      let canIonise_expected = ions.length > 0;
      let canIonise_reported = await atomReader.canIonise(atomicNumber);

      if(canIonise_expected.toString() === canIonise_reported.toString()){
          matches++;
      }else{
        console.log('fail:');
        console.log("    ",atomicNumber,":");
        console.log("    ",canIonise_expected,canIonise_reported);
      }
    }
    assert.equal(matches,attempts);
  });
  it("returns correct isValidIonCharge for all atomicNumber/ionCharge combos", async function(){
    const AtomReader = await ethers.getContractFactory("AtomReader");
    const atomReader = await AtomReader.deploy(powNFTplaceholder.address);
    await atomReader.deployed();

    let matches = 0;
    let attempts = 119;

    for(let atomicNumber = 0; atomicNumber < attempts; atomicNumber++) {

      let ions = getIons(atomicNumber);
      let allMatch = true;

      for(let i = -5; i <= 9; i++){
          let isValid_expected = ions.includes(i);
          let isValid_reported = await atomReader.isValidIonCharge(atomicNumber,i);


          allMatch = allMatch && isValid_expected.toString() === isValid_reported.toString();
      }

      if(allMatch){
        matches++;
      }else{
        console.log('fail:');
        console.log("    ",atomicNumber,":");
        console.log("    ",ions);
      }


    }
    assert.equal(matches,attempts);
  });
});
