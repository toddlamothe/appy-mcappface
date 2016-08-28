package beerme;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown=true)
public class EventStats {
	@JsonProperty("eventcount")
	private long eventcount;
	@JsonProperty("eventstonextround")
	private long eventstonextround;
	@JsonProperty("message")
	private String message;

	public long getEventcount() {
		return eventcount;
	}
	public void setEventcount(long eventcount) {
		this.eventcount = eventcount;
	}
	public long getEventstonextround() {
		return eventstonextround;
	}
	public void setEventstonextround(long eventstonextround) {
		this.eventstonextround = eventstonextround;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
}
