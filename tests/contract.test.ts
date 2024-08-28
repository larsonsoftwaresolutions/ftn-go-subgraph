import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes } from "@graphprotocol/graph-ts"
import { Cancelled } from "../generated/schema"
import { Cancelled as CancelledEvent } from "../generated/Contract/Contract"
import { handleCancelled } from "../src/contract"
import { createCancelledEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let swapper = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newCancelledEvent = createCancelledEvent(swapper)
    handleCancelled(newCancelledEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Cancelled created and stored", () => {
    assert.entityCount("Cancelled", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Cancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "swapper",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
