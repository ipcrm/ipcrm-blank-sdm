/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BitBucketServerRepoRef } from "@atomist/automation-client";
import {
    SoftwareDeliveryMachine,
    SoftwareDeliveryMachineConfiguration,
} from "@atomist/sdm";
import {
    createSoftwareDeliveryMachine,
} from "@atomist/sdm-core";
import {
  ReplaceReadmeTitle,
  SetAtomistTeamInApplicationYml,
  SpringProjectCreationParameterDefinitions,
  SpringProjectCreationParameters,
  TransformSeedToCustomProject,
} from "@atomist/sdm-pack-spring";
import { FixedRepoCreationParameters } from "../../index";
/**
 * Initialize an sdm definition, and add functionality to it.
 *
 * @param configuration All the configuration for this service
 */
export function machine(
    configuration: SoftwareDeliveryMachineConfiguration,
): SoftwareDeliveryMachine {

    const sdm = createSoftwareDeliveryMachine({
        name: "Empty Seed Software Delivery Machine",
        configuration,
    });

    sdm.addGeneratorCommand<SpringProjectCreationParameters>({
        name: "create-spring",
        intent: "create spring",
        description: "Create a new Java Spring Boot REST service",
        parameters: SpringProjectCreationParameterDefinitions,
        startingPoint: () => new BitBucketServerRepoRef(
            configuration.sdm.git.url,
            "matt",
            "newseed",
        ),
        fallbackTarget: () => new FixedRepoCreationParameters(),
        transform: [
            ReplaceReadmeTitle,
            SetAtomistTeamInApplicationYml,
            TransformSeedToCustomProject,
        ],
        tags: ["spring", "boot", "java", "generator"],
    });

    /*
     * this is a good place to type
    sdm.
     * and see what the IDE suggests for after the dot
     */

    return sdm;
}
