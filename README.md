# CaptureTheNFT

- [x] Create a tradeable 1/1 NFT on a public platform where the owner is able to update the URI
	- [x] Tradeable on open market
	- [x] 1/1 Can't be minted or burned by others
	- [x] Flag holder can update the URI
	- [x] Test contract on test network - https://testnets.opensea.io/assets/0xdb6ea8bdef9d657a2cd2ec62fe8a11f99284c113/1
		- Admin can mint a token but not more than 1 [![Test Case 1](https://img.shields.io/badge/Status-Passed-green.svg)](https://shields.io/)
		- Non Admin can't mint a token [![Test Case 2](https://img.shields.io/badge/Status-Passed-green.svg)](https://shields.io/)
		- Owner can change URI [![Test Case 3](https://img.shields.io/badge/Status-Passed-green.svg)](https://shields.io/)
		- Non-Owner can't change URI [![Test Case 4](https://img.shields.io/badge/Status-Passed-green.svg)](https://shields.io/)
		- Owner can list for sale on OpenSea [![Test Case 5](https://img.shields.io/badge/Status-Passed-green.svg)](https://shields.io/)
		- Transfered Owner can change URI [![Test Case 6](https://img.shields.io/badge/Status-Passed-green.svg)](https://shields.io/)
	- [x] Deploy to Main net @ 0xbE5f41cdB6e7db7eCe0716900B44a90946760AD8

- [x] Create web client that displays this information

- [ ] Create a wiki about how to buy the NFT and update URI

- [x] domain secured (capturethenft.live)
