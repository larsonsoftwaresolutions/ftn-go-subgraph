import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes } from "@graphprotocol/graph-ts"
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
} from "../generated/Contract/Contract"

export function createCancelledEvent(swapper: Address): Cancelled {
  let cancelledEvent = changetype<Cancelled>(newMockEvent())

  cancelledEvent.parameters = new Array()

  cancelledEvent.parameters.push(
    new ethereum.EventParam("swapper", ethereum.Value.fromAddress(swapper))
  )

  return cancelledEvent
}

export function createERC721ForERC20ProposalEvent(
  swapper: Address,
  seller: Address,
  buyer: Address,
  param3: ethereum.Tuple,
  salt: Bytes
): ERC721ForERC20Proposal {
  let erc721ForErc20ProposalEvent = changetype<ERC721ForERC20Proposal>(
    newMockEvent()
  )

  erc721ForErc20ProposalEvent.parameters = new Array()

  erc721ForErc20ProposalEvent.parameters.push(
    new ethereum.EventParam("swapper", ethereum.Value.fromAddress(swapper))
  )
  erc721ForErc20ProposalEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  erc721ForErc20ProposalEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  erc721ForErc20ProposalEvent.parameters.push(
    new ethereum.EventParam("param3", ethereum.Value.fromTuple(param3))
  )
  erc721ForErc20ProposalEvent.parameters.push(
    new ethereum.EventParam("salt", ethereum.Value.fromFixedBytes(salt))
  )

  return erc721ForErc20ProposalEvent
}

export function createERC721ForNativeProposalEvent(
  swapper: Address,
  seller: Address,
  buyer: Address,
  param3: ethereum.Tuple,
  salt: Bytes
): ERC721ForNativeProposal {
  let erc721ForNativeProposalEvent = changetype<ERC721ForNativeProposal>(
    newMockEvent()
  )

  erc721ForNativeProposalEvent.parameters = new Array()

  erc721ForNativeProposalEvent.parameters.push(
    new ethereum.EventParam("swapper", ethereum.Value.fromAddress(swapper))
  )
  erc721ForNativeProposalEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  erc721ForNativeProposalEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  erc721ForNativeProposalEvent.parameters.push(
    new ethereum.EventParam("param3", ethereum.Value.fromTuple(param3))
  )
  erc721ForNativeProposalEvent.parameters.push(
    new ethereum.EventParam("salt", ethereum.Value.fromFixedBytes(salt))
  )

  return erc721ForNativeProposalEvent
}

export function createFilledEvent(swapper: Address): Filled {
  let filledEvent = changetype<Filled>(newMockEvent())

  filledEvent.parameters = new Array()

  filledEvent.parameters.push(
    new ethereum.EventParam("swapper", ethereum.Value.fromAddress(swapper))
  )

  return filledEvent
}

export function createMultiERC721ForERC20ProposalEvent(
  swapper: Address,
  seller: Address,
  buyer: Address,
  param3: ethereum.Tuple,
  salt: Bytes
): MultiERC721ForERC20Proposal {
  let multiErc721ForErc20ProposalEvent =
    changetype<MultiERC721ForERC20Proposal>(newMockEvent())

  multiErc721ForErc20ProposalEvent.parameters = new Array()

  multiErc721ForErc20ProposalEvent.parameters.push(
    new ethereum.EventParam("swapper", ethereum.Value.fromAddress(swapper))
  )
  multiErc721ForErc20ProposalEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  multiErc721ForErc20ProposalEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  multiErc721ForErc20ProposalEvent.parameters.push(
    new ethereum.EventParam("param3", ethereum.Value.fromTuple(param3))
  )
  multiErc721ForErc20ProposalEvent.parameters.push(
    new ethereum.EventParam("salt", ethereum.Value.fromFixedBytes(salt))
  )

  return multiErc721ForErc20ProposalEvent
}

export function createMultiERC721ForNativeProposalEvent(
  swapper: Address,
  seller: Address,
  buyer: Address,
  param3: ethereum.Tuple,
  salt: Bytes
): MultiERC721ForNativeProposal {
  let multiErc721ForNativeProposalEvent =
    changetype<MultiERC721ForNativeProposal>(newMockEvent())

  multiErc721ForNativeProposalEvent.parameters = new Array()

  multiErc721ForNativeProposalEvent.parameters.push(
    new ethereum.EventParam("swapper", ethereum.Value.fromAddress(swapper))
  )
  multiErc721ForNativeProposalEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  multiErc721ForNativeProposalEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  multiErc721ForNativeProposalEvent.parameters.push(
    new ethereum.EventParam("param3", ethereum.Value.fromTuple(param3))
  )
  multiErc721ForNativeProposalEvent.parameters.push(
    new ethereum.EventParam("salt", ethereum.Value.fromFixedBytes(salt))
  )

  return multiErc721ForNativeProposalEvent
}

export function createOwnershipTransferStartedEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferStarted {
  let ownershipTransferStartedEvent = changetype<OwnershipTransferStarted>(
    newMockEvent()
  )

  ownershipTransferStartedEvent.parameters = new Array()

  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferStartedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPlatformFeeChangedEvent(
  recipient: Address,
  basisPoints: i32
): PlatformFeeChanged {
  let platformFeeChangedEvent = changetype<PlatformFeeChanged>(newMockEvent())

  platformFeeChangedEvent.parameters = new Array()

  platformFeeChangedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  platformFeeChangedEvent.parameters.push(
    new ethereum.EventParam(
      "basisPoints",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(basisPoints))
    )
  )

  return platformFeeChangedEvent
}
