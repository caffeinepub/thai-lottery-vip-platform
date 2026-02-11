import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import List "mo:core/List";

actor {
  // Types
  type PlayType = {
    #vip;
    #rumble;
    #local;
  };

  type GameType = {
    #bangkokWeekly;
    #thailandLottery;
  };

  type Bet = {
    number : Text;
    amount : Nat;
    playType : PlayType;
    gameType : GameType;
    timestamp : Time.Time;
  };

  type Result = {
    gameName : Text;
    date : Text;
    time : Text;
    winningNumber : Text;
  };

  type Booking = {
    userName : Text;
    contactNumber : Text;
    gameType : GameType;
    playType : PlayType;
    bookingDate : Text;
    timestamp : Time.Time;
  };

  module Result {
    public func compare(a : Result, b : Result) : Order.Order {
      Text.compare(b.date, a.date);
    };
  };

  // Persistent Data Structures
  let bets = List.empty<Bet>();
  let bookings = List.empty<Booking>();
  let resultsMap = Map.empty<Text, Result>();

  // Predefined results
  let thaiHistory : [Result] = [
    {
      gameName = "Thailand Lottery";
      date = "2023-12-01";
      time = "14:00";
      winningNumber = "123456";
    },
    {
      gameName = "Thailand Lottery";
      date = "2023-11-01";
      time = "14:00";
      winningNumber = "654321";
    },
    {
      gameName = "Thailand Lottery";
      date = "2023-10-01";
      time = "14:00";
      winningNumber = "112233";
    },
    {
      gameName = "Thailand Lottery";
      date = "2023-09-01";
      time = "14:00";
      winningNumber = "445566";
    },
    {
      gameName = "Thailand Lottery";
      date = "2023-08-01";
      time = "14:00";
      winningNumber = "778899";
    },
  ];

  let bangkokHistory : [Result] = [
    {
      gameName = "Bangkok Weekly";
      date = "2023-12-15";
      time = "15:00";
      winningNumber = "987654";
    },
    {
      gameName = "Bangkok Weekly";
      date = "2023-12-08";
      time = "15:00";
      winningNumber = "456789";
    },
    {
      gameName = "Bangkok Weekly";
      date = "2023-12-01";
      time = "15:00";
      winningNumber = "321987";
    },
    {
      gameName = "Bangkok Weekly";
      date = "2023-11-24";
      time = "15:00";
      winningNumber = "654123";
    },
    {
      gameName = "Bangkok Weekly";
      date = "2023-11-17";
      time = "15:00";
      winningNumber = "123789";
    },
    {
      gameName = "Bangkok Weekly";
      date = "2023-11-10";
      time = "15:00";
      winningNumber = "987321";
    },
  ];

  // Initialize results map with predefined data
  public shared ({ caller }) func init() : async () {
    for (result in thaiHistory.values()) {
      resultsMap.add(result.date, result);
    };
    for (result in bangkokHistory.values()) {
      resultsMap.add(result.date, result);
    };
  };

  // GAME PLAY FUNCTIONS
  public shared ({ caller }) func submitBet(number : Text, amount : Nat, playType : PlayType, gameType : GameType) : async () {
    let bet : Bet = {
      number;
      amount;
      playType;
      gameType;
      timestamp = Time.now();
    };
    bets.add(bet);
  };

  // RESULTS FUNCTIONS
  public query ({ caller }) func getThaiHistory() : async [Result] {
    thaiHistory;
  };

  public query ({ caller }) func getBangkokHistory() : async [Result] {
    bangkokHistory;
  };

  public query ({ caller }) func getAllResults() : async [Result] {
    let allResults = thaiHistory.concat(bangkokHistory);
    allResults.sort();
  };

  // BOOKING FUNCTIONS
  public shared ({ caller }) func submitBooking(userName : Text, contactNumber : Text, gameType : GameType, playType : PlayType, bookingDate : Text) : async () {
    let booking : Booking = {
      userName;
      contactNumber;
      gameType;
      playType;
      bookingDate;
      timestamp = Time.now();
    };
    bookings.add(booking);
  };

  // Additional Queries
  public query ({ caller }) func getBookings() : async [Booking] {
    bookings.toArray();
  };

  public query ({ caller }) func getBets() : async [Bet] {
    bets.toArray();
  };

  public query ({ caller }) func getResultByDate(date : Text) : async Result {
    switch (resultsMap.get(date)) {
      case (null) { Runtime.trap("Result not found") };
      case (?result) { result };
    };
  };
};
