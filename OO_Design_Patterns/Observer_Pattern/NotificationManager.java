/****************************
 * FILE NAME: NotificationManager.java
 * AUTHOR: Justin Pan | justinp04
 * PURPOSE: This is the 'publisher' that will be sending out notifications to it's subscribers
 ****************************/
package OO_Design_Patterns.Observer_Pattern;

import java.util.*;

public class NotificationManager {
    private Map<String, List<Listener>> EventListeners;

    public NotificationManager() {
        EventListeners = new HashMap<>();
    }

    public void subscribe(String eventName, Listener pListener) {
        if(!EventListeners.get(eventName).contains(pListener)) {
            EventListeners.get(eventName).add(pListener);
            System.out.println("The user has been added to this notification list and will begin receiving notifications.");
        }
        else {
            System.out.println("The user is already receiving notifications for this event.");
        }
    }

    public void unsubscribe(String eventName, Listener pListener) {
        if(EventListeners.get(eventName).contains(pListener)) {
            EventListeners.get(eventName).remove(pListener);
            System.out.println("The user has been removed from this notification list and will no longer be receiving notifications for this event.");
        }
        else {
            System.out.println("The user is not receiving notifications for this event.");
        }
    }

    public void notify(String eventType) {
        EventListeners.get(eventType);
    }
}