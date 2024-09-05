import {
  Cancelled as CancelledEvent,
  ERC721ForERC20Proposal as ERC721ForERC20ProposalEvent,
  ERC721ForNativeProposal as ERC721ForNativeProposalEvent,
  Filled as FilledEvent,
  MultiERC721ForERC20Proposal as MultiERC721ForERC20ProposalEvent,
  MultiERC721ForERC20ProposalParam3OfferStruct,
  MultiERC721ForNativeProposal as MultiERC721ForNativeProposalEvent,
  OwnershipTransferStarted as OwnershipTransferStartedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PlatformFeeChanged as PlatformFeeChangedEvent,
} from "../generated/Contract/Contract";
import { MultiERC721Token } from "../generated/schema";
import {
  Cancelled,
  ERC721ForERC20Proposal,
  ERC721ForNativeProposal,
  Filled,
  MultiERC721ForERC20Proposal,
  MultiERC721ForNativeProposal,
  OwnershipTransferStarted,
  OwnershipTransferred,
  PlatformFeeChanged,
  ThirdParty,
  Debug,
} from "../generated/schema";

export function handleCancelled(event: CancelledEvent): void {
  let entity = new Cancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.swapper = event.params.swapper.toHexString();

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleERC721ForERC20Proposal(
  event: ERC721ForERC20ProposalEvent
): void {
  let entity = new ERC721ForERC20Proposal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.swapper = event.params.swapper.toHexString();
  entity.seller = event.params.seller.toHexString();
  entity.buyer = event.params.buyer.toHexString();
  entity.param3_parties_seller = event.params.param3.parties.seller;
  entity.param3_parties_buyer = event.params.param3.parties.buyer;
  entity.param3_offer_addr = event.params.param3.offer.addr;
  entity.param3_offer_id = event.params.param3.offer.id;
  // entity.param3_consideration_thirdParty =
  //   event.params.param3.consideration.thirdParty
  entity.param3_consideration_maxPlatformFee =
    event.params.param3.consideration.maxPlatformFee;
  entity.param3_consideration_total = event.params.param3.consideration.total;
  entity.param3_consideration_currency =
    event.params.param3.consideration.currency;
  entity.param3_validUntilTime = event.params.param3.validUntilTime;
  entity.salt = event.params.salt;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  // Save thirdParty data
  if (event.params.param3.consideration.thirdParty.length > 0) {
    let thirdPartyArray: string[] = []
    for (
      let i = 0;
      i < event.params.param3.consideration.thirdParty.length;
      i++
    ) {
      let thirdPartyStruct = event.params.param3.consideration.thirdParty[i];
      let thirdPartyEntity = new ThirdParty(
        event.transaction.hash.toHex() +
          "-" +
          event.logIndex.toString() +
          "-" +
          i.toString()
      );
      thirdPartyEntity.to = thirdPartyStruct.to;
      thirdPartyEntity.amount = thirdPartyStruct.amount;
      thirdPartyEntity.save();

      thirdPartyArray.push(thirdPartyEntity.id);
      entity.param3_consideration_thirdParty = thirdPartyArray;
    }
    logDebugMessage("thirdpartyarray: " + event.params.swapper.toHexString(), thirdPartyArray.length.toString(), event.block.number.toString())
  }

  entity.save();
}

export function handleERC721ForNativeProposal(
  event: ERC721ForNativeProposalEvent
): void {
  let entity = new ERC721ForNativeProposal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.swapper = event.params.swapper.toHexString();
  entity.seller = event.params.seller.toHexString();
  entity.buyer = event.params.buyer.toHexString();
  entity.param3_parties_seller = event.params.param3.parties.seller;
  entity.param3_parties_buyer = event.params.param3.parties.buyer;
  entity.param3_offer_addr = event.params.param3.offer.addr;
  entity.param3_offer_id = event.params.param3.offer.id;
  // entity.param3_consideration_thirdParty =
  //   event.params.param3.consideration.thirdParty;
  entity.param3_consideration_maxPlatformFee =
    event.params.param3.consideration.maxPlatformFee;
  entity.param3_consideration_total = event.params.param3.consideration.total;
  entity.param3_validUntilTime = event.params.param3.validUntilTime;
  entity.salt = event.params.salt;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  // Save thirdParty data
  if (event.params.param3.consideration.thirdParty.length > 0) {
    for (
      let i = 0;
      i < event.params.param3.consideration.thirdParty.length;
      i++
    ) {
      let thirdPartyStruct = event.params.param3.consideration.thirdParty[i];
      let thirdPartyEntity = new ThirdParty(
        event.transaction.hash.toHex() +
          "-" +
          event.logIndex.toString() +
          "-" +
          i.toString()
      );
      thirdPartyEntity.to = thirdPartyStruct.to;
      thirdPartyEntity.amount = thirdPartyStruct.amount;
      thirdPartyEntity.save();

      // Link to the Proposal entity
      let thirdPartyArray = entity.param3_consideration_thirdParty;
      if (thirdPartyArray) {
        thirdPartyArray.push(thirdPartyEntity.id);
        entity.param3_consideration_thirdParty = thirdPartyArray;
      }
    }
  } else {
    entity.param3_consideration_thirdParty = [];
  }

  entity.save();
}

export function handleFilled(event: FilledEvent): void {
  let entity = new Filled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.swapper = event.params.swapper.toHexString();

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

function logDebugMessage(
  message: string,
  value: string,
  blockNumber: string
): void {
  let debugEntity = new Debug(blockNumber);
  debugEntity.message = message;
  debugEntity.value = value;
  debugEntity.blockNumber = blockNumber;
  debugEntity.save();
}

export function handleMultiERC721ForERC20Proposal(
  event: MultiERC721ForERC20ProposalEvent
): void {
  let entity = new MultiERC721ForERC20Proposal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.swapper = event.params.swapper.toHexString();
  entity.seller = event.params.seller.toHexString();
  entity.buyer = event.params.buyer.toHexString();
  entity.param3_parties_seller = event.params.param3.parties.seller;
  entity.param3_parties_buyer = event.params.param3.parties.buyer;
  entity.param3_consideration_maxPlatformFee =
    event.params.param3.consideration.maxPlatformFee;
  entity.param3_consideration_total = event.params.param3.consideration.total;
  entity.param3_consideration_currency =
    event.params.param3.consideration.currency;
  entity.param3_validUntilTime = event.params.param3.validUntilTime;
  entity.salt = event.params.salt;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  // logDebugMessage(
  //   "offer",
  //   "swapper: " +
  //     event.params.swapper.toHexString() +
  //     "\noffer length: " +
  //     event.params.param3.offer.length.toString() +
  //     "\naddr: " + event.params.param3.offer[0].addr.toHexString() +
  //     "\nids: " +
  //     event.params.param3.offer[0].ids.toString(),
  //   event.block.number.toString()
  // );

  //save offer data
  if (event.params.param3.offer.length > 0) {
    for (let j = 0; j < event.params.param3.offer.length; j++) {
      let offerStruct = event.params.param3.offer[j];
      let offerEntity = new MultiERC721Token(
        event.transaction.hash.toHex() +
          "-" +
          event.logIndex.toString() +
          "-" +
          j.toString()
      );

      offerEntity.addr = offerStruct.addr.toHexString();
      offerEntity.ids = offerStruct.ids
      offerEntity.save();
      
      entity.param3_offer = [offerEntity.id] // TO DO: update if ever allowing multiple collections in one deal
    }
  }

  // logDebugMessage(
  //   "thirdParty: " + event.params.swapper.toHexString() + " block num: " + event.block.number.toString(),
  //   "thirdparty: " +
  //     event.params.param3.consideration.thirdParty.length.toString(),
  //   event.block.number.toString()
  // );

  // Save thirdParty data
  if (event.params.param3.consideration.thirdParty.length > 0) {
    let thirdPartyArray: string[] = []
    for (
      let i = 0;
      i < event.params.param3.consideration.thirdParty.length;
      i++
    ) {
      let thirdPartyStruct = event.params.param3.consideration.thirdParty[i];
      let thirdPartyEntity = new ThirdParty(
        event.transaction.hash.toHex() +
          "-" +
          event.logIndex.toString() +
          "-" +
          i.toString()
      );
      thirdPartyEntity.to = thirdPartyStruct.to;
      thirdPartyEntity.amount = thirdPartyStruct.amount;
      thirdPartyEntity.save();

      thirdPartyArray.push(thirdPartyEntity.id);
      entity.param3_consideration_thirdParty = thirdPartyArray;
    }
    logDebugMessage("thirdpartyarray: " + event.params.swapper.toHexString(), thirdPartyArray.length.toString(), event.block.number.toString())
  }
  // let debugValue = ""
  // if (entity.param3_consideration_thirdParty) {
  //   debugValue = entity.param3_consideration_thirdParty.length.toString()
  // } else {
  //   debugValue = "param3_consideration_thirdParty"
  // }
  // let debugValue = entity.param3_consideration_thirdParty !== null ? entity.param3_consideration_thirdParty.length.toString() : "param3_consideration_thirdParty is not defined"
  // logDebugMessage("param3_consideration_thirdParty", thirdPartyArray.length.toString(), event.block.number.toString())
  // else {
  //   entity.param3_consideration_thirdParty = [];
  // }

  entity.save();
}

export function handleMultiERC721ForNativeProposal(
  event: MultiERC721ForNativeProposalEvent
): void {
  let entity = new MultiERC721ForNativeProposal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.swapper = event.params.swapper.toHexString();
  entity.seller = event.params.seller.toHexString();
  entity.buyer = event.params.buyer.toHexString();
  entity.param3_parties_seller = event.params.param3.parties.seller;
  entity.param3_parties_buyer = event.params.param3.parties.buyer;
  entity.param3_consideration_maxPlatformFee =
    event.params.param3.consideration.maxPlatformFee;
  entity.param3_consideration_total = event.params.param3.consideration.total;
  entity.param3_validUntilTime = event.params.param3.validUntilTime;
  entity.salt = event.params.salt;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  //save offer data
  if (event.params.param3.offer.length > 0) {
    for (let j = 0; j < event.params.param3.offer.length; j++) {
      let offerStruct = event.params.param3.offer[j];
      let offerEntity = new MultiERC721Token(
        event.transaction.hash.toHex() +
          "-" +
          event.logIndex.toString() +
          "-" +
          j.toString()
      );

      offerEntity.addr = offerStruct.addr.toHexString();
      offerEntity.ids = offerStruct.ids
      offerEntity.save();
      
      entity.param3_offer = [offerEntity.id] // TO DO: update if ever allowing multiple collections in one deal
    }
  }

  // Save thirdParty data
  if (event.params.param3.consideration.thirdParty.length > 0) {
    for (
      let i = 0;
      i < event.params.param3.consideration.thirdParty.length;
      i++
    ) {
      let thirdPartyStruct = event.params.param3.consideration.thirdParty[i];
      let thirdPartyEntity = new ThirdParty(
        event.transaction.hash.toHex() +
          "-" +
          event.logIndex.toString() +
          "-" +
          i.toString()
      );
      thirdPartyEntity.to = thirdPartyStruct.to;
      thirdPartyEntity.amount = thirdPartyStruct.amount;
      thirdPartyEntity.save();

      // Link to the Proposal entity
      let thirdPartyArray = entity.param3_consideration_thirdParty;
      if (thirdPartyArray) {
        thirdPartyArray.push(thirdPartyEntity.id);
        entity.param3_consideration_thirdParty = thirdPartyArray;
      }
    }
  } else {
    entity.param3_consideration_thirdParty = [];
  }

  entity.save();
}

export function handleOwnershipTransferStarted(
  event: OwnershipTransferStartedEvent
): void {
  let entity = new OwnershipTransferStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePlatformFeeChanged(event: PlatformFeeChangedEvent): void {
  let entity = new PlatformFeeChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.recipient = event.params.recipient;
  entity.basisPoints = event.params.basisPoints;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
