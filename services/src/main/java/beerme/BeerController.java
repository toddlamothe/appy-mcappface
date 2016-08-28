package beerme;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
public class BeerController {
	private static final long EVENT_GOAL = 10;
	
	@RequestMapping("/eventcount")
	public long EventCount() {
		System.out.println("[eventcount]");
//		try {
			return FetchEventCount();
//		}
//		catch (Exception e) {
//			System.out.println("Error fetching event total: " + e.getMessage());
//		}
//		return 0;
	}

	private long FetchEventCount() {
		System.out.println("  [FetchEventCount]");
		return 2;
	}
	
	// Fetch and return event statistics
	@RequestMapping("/eventstats")
	public EventStats fetchEventStats() {
		EventStats eventsStats = new EventStats();
		System.out.println("[fetchEventStats]");

//		try {
			long eventCount = fetchEventCount();
			eventsStats.setEventcount(eventCount);
			eventsStats.setEventstonextround(EVENT_GOAL - eventCount);;
			eventsStats.setMessage(buildMessage(eventCount));
			
//		}
//		catch (Exception e) {
//			System.out.println("Exception querying incident list: " + e.getMessage());
//			System.out.println(e.getStackTrace());			
//		}
		
		return eventsStats;
	}
	
	// Log and save a new event to the database	
	@RequestMapping(value="/logevent", method=RequestMethod.POST)
	public void logEvent(@RequestBody Event newEvent) {
		System.out.println("New Event...");
		System.out.println("  type: " + newEvent.getEventType());
		System.out.println("  comments: " + newEvent.getComments());
		System.out.println("  id: " + newEvent.getId());
		newEvent.setDatetime(new Date());
		saveEvent(newEvent);
	}
	
	private static long fetchEventCount() {
		long eventCount;
		
		System.out.println("[fetchEventCount]");
		System.out.println("Creating configuration...");
		Configuration config = new Configuration();
		config.configure("hibernate.cfg.xml");

		System.out.println("Creating service registry...");
		StandardServiceRegistry serviceRegistry = 
				new StandardServiceRegistryBuilder().applySettings(config.getProperties()).build();

		System.out.println("Creating factory...");
		SessionFactory factory = config.buildSessionFactory(serviceRegistry);
		Session session = factory.openSession();
		
		System.out.println("Querying for outage total...");
		eventCount = ((Number) session.createSQLQuery("select eventcount from event_count").uniqueResult()).longValue();
		System.out.println("Event count: " + eventCount);
		
		// Return the connection to the pool (does not terminate the DB connection
		session.flush();
		session.clear();
		session.close();
		
		session = null;
		factory.close();
		factory = null;
		serviceRegistry = null;				
		
		return eventCount;
	}
	
	private static String buildMessage(long eventCount) {
		String message = "";
		if (eventCount == 0) {
			message = "Best get moving, that beer's not gonna drink itself!";
		}
		if (eventCount <4 && eventCount > 0 ) {
			message = "Good start. Keep it up!";
		}
		if (eventCount >=4 && eventCount < 7) {
			message = "Nice work!";
		}
		if (eventCount >=7) {
			message = "Almost there!";
		}
		return message;
	}
	
	private static void saveEvent(Event newEvent) {
		System.out.println("[saveEvent]");
		try {
			System.out.println("Creating configuration...");
			Configuration config = new Configuration();
			config.configure("hibernate.cfg.xml");

			System.out.println("Creating service registry...");
			StandardServiceRegistry serviceRegistry = 
					new StandardServiceRegistryBuilder().applySettings(config.getProperties()).build();

			System.out.println("Creating factory...");
			SessionFactory factory = config.buildSessionFactory(serviceRegistry);
			Session session = factory.openSession();
			Transaction transaction = session.beginTransaction();
			
			System.out.println("Saving event...");
			session.save(newEvent);	
			
			// Return the connection to the pool (does not terminate the DB connection
			session.flush();
			session.clear();
			transaction.commit();
			session.close();
			
			transaction = null;
			session = null;
			factory.close();
			factory = null;
			serviceRegistry = null;			
			
			System.out.println("Transaction commited.");
		}
		catch (Exception e) {
			System.out.println("Exception creating new event record: " + e.getMessage());
			
		}

	}
	
//	private static StandardServiceRegistry serviceRegistry;
//	private static Session session;
//	private static Session getSession() {
//		if (session == null) {
//			System.out.println("Creating configuration...");
//			Configuration config = new Configuration();
//			config.configure("hibernate.cfg.xml");
//
//			System.out.println("Creating service registry...");
//			serviceRegistry = new StandardServiceRegistryBuilder().applySettings(config.getProperties()).build();
//
//			System.out.println("Creating factory...");
//			SessionFactory factory = config.buildSessionFactory(serviceRegistry);
//			Session session = factory.openSession();
//			Transaction transaction = session.beginTransaction();
//		}
//		return session;
//	}
	
}
