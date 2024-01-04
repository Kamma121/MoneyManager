
# MoneyManager 💰

MoneyManager is a full-stack web application designed to help users manage their finances effectively. Built using **Angular**, **Spring Boot**, and **MySQL**, it provides a robust and interactive platform for tracking expenses, earnings, and savings. MoneyManager simplifies personal finance management with its user-friendly interface and powerful backend.


## App overview
For a comprehensive overview of MoneyManager's features and functionalities, watch the application walkthrough video on YouTube:

## Features

- **Dashboard overview:**   Instantly get a snapshot of your financial health and summaries of all sections with our easy-to-navigate Dashboard.
- **Expense Tracking:**  Keep track of where every penny goes with detailed categorization of your expenses. Utilize interactive charts to better understand your spendings.
- **Earnings Tracking:**   Accurately track all your income sources and observe trends over time. Use this data for effective financial planning and forecasting.
- **Savings:**  Set up to three different savings goals, each with its own dedicated piggy bank and visually monitor your progress.
- **Download Reports:** Generate in-depth reports of your financial activities with just a click.


## Technologies and Techniques Used
**Frontend:**
- **Angular**
- **TypeScript**
- **NgxCharts**
- **Bootstrap**
- **CSS**
- **HTML**
- 
**Backend:**
- **Java**
- **Spring Boot**
- **Hibernate**
- **Lombok**
- **JWT Auth**
- **SendGrid**
- **MySQL**
 

 **NgxCharts** - Used to create interactive financial charts, such as expense and income charts, providing instant insight into the user's financial health.

 **JWT Auth** - User authentication is done using `jwt` ,due to its secure and stateless session management and ease of integration with Spring Boot-based applications.

  **SendGrid** -  Utilized for reliable email delivery in the contact form, ensuring that user queries and feedback are effectively communicated to the admin.
## How to use
- Sign Up or Sign in to your MoneyManager account.
- Add and categorize your expenses and earnings.
- Set savings goals and track progress.
- Visualize financial data on the dashboard.
- Download reports to get a better overview of your finances 
- Access and manage your account up to date.
## Installation

1. Clone the repository:

```bash
  git clone https://github.com/Kamma121/MoneyManager.git
```

2. Open the backend project (Spring Boot) in an IDE like IntelliJ IDEA or Eclipse, and the frontend project (Angular) in an IDE or text editor like Visual Studio Code.

3. Build and run the backend and frontend separately.

For Spring Boot:
```bash
cd server
mvn spring-boot:run
```

 For Angular:   
```bash
cd client
npm install
ng serve
```
