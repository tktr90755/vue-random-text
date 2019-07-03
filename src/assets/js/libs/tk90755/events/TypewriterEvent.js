 /**
 * Copyright 2014, "tktr90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title tktr90755.events.Event.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
//__________________________________________________________________________________
// How to use
/*


*/
import Event from '@/assets/js/libs/tk90755/events/Event.js'
export default class TypewriterEvent extends Event{

	constructor(type, origin, bubbles, cancelable) {
		super(type, origin, bubbles, cancelable)
  }

	//event types
	static TYPE_START(){ return "typeStart" };
	static TYPE_UPDATE(){ return "typeUpdate" };
	static TYPE_COMPLETE(){ return "typeComplete" };
}