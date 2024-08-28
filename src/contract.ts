import {
  Cancelled as CancelledEvent,
  ERC721ForERC20Proposal as ERC721ForERC20ProposalEvent,
  ERC721ForNativeProposal as ERC721ForNativeProposalEvent,
  Filled as FilledEvent,
  MultiERC721ForERC20Proposal as MultiERC721ForERC20ProposalEvent,
  MultiERC721ForNativeProposal as MultiERC721ForNativeProposalEvent,
  OwnershipTransferStarted as OwnershipTransferStartedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PlatformFeeChanged as PlatformFeeChangedEvent
} from "../generated/Contract/Contract"
import {
  Cancelled,
  ERC721ForERC20Proposal,
  ERC721ForNativeProposal,
  Filled,
  MultiERC721ForERC20Proposal,
  MultiERC721ForNativeProposal,
  OwnershipTransferStarted,
  OwnershipTransferred,
  PlatformFeeChanged
} from "../generated/schema"

export function handleCancelled(event: CancelledEvent): void {
  let entity = new Cancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.swapper = event.params.swapper

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleERC721ForERC20Proposal(
  event: ERC721ForERC20ProposalEvent
): void {
  let entity = new ERC721ForERC20Proposal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.swapper = event.params.swapper
  entity.seller = event.params.seller
  entity.buyer = event.params.buyer
  entity.param3_parties_seller = event.params.param3.parties.seller
  entity.param3_parties_buyer = event.params.param3.parties.buyer
  entity.param3_offer_addr = event.params.param3.offer.addr
  entity.param3_offer_id = event.params.param3.offer.id
  entity.param3_consideration_thirdParty =
    event.params.param3.consideration.thirdParty
  entity.param3_consideration_maxPlatformFee =
    event.params.param3.consideration.maxPlatformFee
  entity.param3_consideration_total = event.params.param3.consideration.total
  entity.param3_consideration_currency =
    event.params.param3.consideration.currency
  entity.param3_validUntilTime = event.params.param3.validUntilTime
  entity.salt = event.params.salt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleERC721ForNativeProposal(
  event: ERC721ForNativeProposalEvent
): void {
  let entity = new ERC721ForNativeProposal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.swapper = event.params.swapper
  entity.seller = event.params.seller
  entity.buyer = event.params.buyer
  entity.param3_parties_seller = event.params.param3.parties.seller
  entity.param3_parties_buyer = event.params.param3.parties.buyer
  entity.param3_offer_addr = event.params.param3.offer.addr
  entity.param3_offer_id = event.params.param3.offer.id
  entity.param3_consideration_thirdParty =
    event.params.param3.consideration.thirdParty
  entity.param3_consideration_maxPlatformFee =
    event.params.param3.consideration.maxPlatformFee
  entity.param3_consideration_total = event.params.param3.consideration.total
  entity.param3_validUntilTime = event.params.param3.validUntilTime
  entity.salt = event.params.salt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFilled(event: FilledEvent): void {
  let entity = new Filled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.swapper = event.params.swapper

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMultiERC721ForERC20Proposal(
  event: MultiERC721ForERC20ProposalEvent
): void {
  let entity = new MultiERC721ForERC20Proposal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.swapper = event.params.swapper
  entity.seller = event.params.seller
  entity.buyer = event.params.buyer
  entity.param3_parties_seller = event.params.param3.parties.seller
  entity.param3_parties_buyer = event.params.param3.parties.buyer
  entity.param3_offer = event.params.param3.offer
  entity.param3_consideration_thirdParty =
    event.params.param3.consideration.thirdParty
  entity.param3_consideration_maxPlatformFee =
    event.params.param3.consideration.maxPlatformFee
  entity.param3_consideration_total = event.params.param3.consideration.total
  entity.param3_consideration_currency =
    event.params.param3.consideration.currency
  entity.param3_validUntilTime = event.params.param3.validUntilTime
  entity.salt = event.params.salt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMultiERC721ForNativeProposal(
  event: MultiERC721ForNativeProposalEvent
): void {
  let entity = new MultiERC721ForNativeProposal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.swapper = event.params.swapper
  entity.seller = event.params.seller
  entity.buyer = event.params.buyer
  entity.param3_parties_seller = event.params.param3.parties.seller
  entity.param3_parties_buyer = event.params.param3.parties.buyer
  entity.param3_offer = event.params.param3.offer
  entity.param3_consideration_thirdParty =
    event.params.param3.consideration.thirdParty
  entity.param3_consideration_maxPlatformFee =
    event.params.param3.consideration.maxPlatformFee
  entity.param3_consideration_total = event.params.param3.consideration.total
  entity.param3_validUntilTime = event.params.param3.validUntilTime
  entity.salt = event.params.salt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferStarted(
  event: OwnershipTransferStartedEvent
): void {
  let entity = new OwnershipTransferStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePlatformFeeChanged(event: PlatformFeeChangedEvent): void {
  let entity = new PlatformFeeChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.recipient = event.params.recipient
  entity.basisPoints = event.params.basisPoints

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
