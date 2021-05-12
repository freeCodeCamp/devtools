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
