class Order {
  constructor(
    id,
    userName,
    chefName,
    totalAmount,
    weeklySubscriptionAmount,
    numberOfWeeks,
    numberOfPeople,
    userAddress,
    chefAddress,
    chefProfilePicture,
    type,
    isVeg,
    startDate
  ) {
    this.id = id;
    this.userName = userName;
    this.chefName = chefName;
    this.totalAmount = totalAmount;
    this.weeklySubscriptionAmount = weeklySubscriptionAmount;
    this.numberOfWeeks = numberOfWeeks;
    this.numberOfPeople = numberOfPeople;
    this.userAddress = userAddress;
    this.chefAddress = chefAddress;
    this.chefProfilePicture = chefProfilePicture;
    this.type = type;
    this.isVeg = isVeg;
    this.startDate = startDate;
  }
}

export default Order;
