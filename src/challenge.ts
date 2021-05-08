/*
 * Copyright 2021-2021 Seth Falco and Contributors (https://github.com/SethFalco/fccDevTools/graphs/contributors)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The URL components of a challenge.
 * 
 * @since 0.0.1
 */
export interface Challenge {
  
  /** The language the challenge is written in. */
  language: string;

  /** 
   * The name of the course or certificate the 
   * challenge is under.
   */
  courseName: string;
  
  /** The name of the section the challenge is under. */
  sectionName: string;

  /** The dashed name of the challenge. */
  dashedName: string;
}
