/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import {NDArray} from '../ndarray';
import {KernelConfigRegistry} from './kernel_registry';

export type TapeNodeOutput = NDArray|{[outputName: string]: NDArray};

export interface TapeNode<T extends TapeNodeOutput> {
  id: number;
  name: string;
  inputAndArgs: TapeNodeInputConfig;
  output: T;
  gradient: (dy: T, y: T) => TapeNodeInputGradientArrays;
}

export interface TapeNodeInputConfig {
  inputs: TapeNodeInputArrays;
}

export type TapeNodeInputArrays = {
  [inputName: string]: NDArray;
};

export type TapeNodeInputGradientArrays = {
  [inputName: string]: () => NDArray;
};

// Kernel nodes
export interface KernelNode extends TapeNode<NDArray> {
  kernel: keyof KernelConfigRegistry;
  inputAndArgs: KernelInputConfig;
  output: NDArray;
}

export interface KernelInputConfig extends TapeNodeInputConfig {
  inputs: TapeNodeInputArrays;
  // tslint:disable-next-line:no-any
  args?: {[argName: string]: any};
}
