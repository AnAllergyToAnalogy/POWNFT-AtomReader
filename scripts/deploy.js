async function main() {

    let network = process.env.HARDHAT_NETWORK;

    console.log("network:",network);

    const POWNFT = {
        mainnet: "0x9Abb7BdDc43FA67c76a62d8C016513827f59bE1b",
        ropsten: "0xcf2F4F98df13DAA8bA5780003fcb1F4e31931F45",
    }

    let pownft = POWNFT[network]

    const [deployer] = await ethers.getSigners();

    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const AtomReader = await ethers.getContractFactory("AtomReader");

    const atomReader = await AtomReader.deploy(pownft);

    console.log("AtomReader address:", atomReader.address);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
