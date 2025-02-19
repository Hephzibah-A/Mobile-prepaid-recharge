Below is a sample **README.md** file that covers the entire project in a concise, professional, and simple manner:

---

```markdown
# MobiComm

MobiComm is a complete web-based solution for mobile recharge management. It includes an Admin Dashboard, User Login with OTP verification, Recharge History with PDF export, Plans browsing and filtering, Payment processing, and User Profile management. The project is designed to provide a seamless experience for both end-users and administrators.

## Features

- **Admin Dashboard**  
  View key statistics such as total users, active users, and expiring subscriptions. Manage recharge plans, view recharge history, and access analytics charts (Revenue Trends, User Growth, Plan Distribution, Recharge Trend).

- **User Login & OTP Verification**  
  Secure login page with OTP verification to authenticate users.

- **Recharge History**  
  Display the logged-in user’s recharge and payment history with an option to download the history as a PDF.

- **Plans**  
  Browse and filter available recharge plans. Users can search, sort, and filter by price range, validity, data allowance, plan type, and popularity.

- **Payment Processing**  
  Process payments for recharge plans with multiple payment methods (Card, UPI, Net Banking, Wallet) along with form validation and history recording.

- **User Profile**  
  View and edit user profile details. Data is fetched and updated via JSON Server.

- **Responsive Design**  
  All pages are designed to be responsive using Bootstrap and custom CSS, ensuring a smooth experience on any device.

## Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Frameworks/Libraries:**  
  - [Bootstrap 5](https://getbootstrap.com/) for responsive design  
  - [Chart.js](https://www.chartjs.org/) for interactive charts  
  - [jsPDF](https://github.com/parallax/jsPDF) and [html2canvas](https://html2canvas.hertzen.com/) for PDF generation  
  - [Font Awesome](https://fontawesome.com/) for icons
- **Backend (Development):**  
  - [JSON Server](https://github.com/typicode/json-server) for simulating a REST API with a simple `db.json` file

## Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install JSON Server**  
   If you don't have JSON Server installed globally, run:
   ```bash
   npm install -g json-server
   ```

3. **Prepare the Data**  
   Ensure a `db.json` file exists in the project root with your user and plan data. For example:
   ```json
   {
     "users": [
       {
         "id": 1,
         "phnno": "9876543210",
         "name": "Alice Johnson",
         "email": "alice@example.com",
         "paymentHistory": [
           { "id": 1, "date": "2023-01-15", "amount": 150, "method": "Credit Card", "status": "Successful" }
         ],
         "rechargeHistory": [
           { "id": 1, "date": "2023-01-20", "plan": "Combo", "payment": "Credit Card", "amount": 199 }
         ]
       }
       // ... other users ...
     ],
     "plans": [
       {
         "id": 1,
         "price": 199,
         "data": "1GB/day",
         "calls": "Unlimited",
         "validity": 28,
         "planType": "combo",
         "popular": true
       }
       // ... other plans ...
     ]
   }
   ```

4. **Start JSON Server**
   ```bash
   json-server --watch db.json
   ```
   JSON Server will run at [http://localhost:3000](http://localhost:3000).

5. **Serve the Application**
   Use a static server (for example, [Live Server in VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) or Python’s http.server) to serve the project files over HTTP.

## Usage

- **Admin Dashboard:** Open `admin.html` to view the dashboard, manage recharge plans, view recharge history, and access analytics.
- **User Login:** Open `login.html` for user authentication via OTP.
- **Recharge History:** Open `recharge-history.html` to view your recharge and payment history and download it as a PDF.
- **Plans:** Open `plans.html` to browse and filter available recharge plans.
- **Payment:** Open `payment.html` to complete the payment process for a selected plan.
- **User Profile:** Open `profile.html` to view and edit your profile details.

## Customization

- **Styling:**  
  Modify the CSS files (`style.css`, `Assets/css/plans.css`, `Assets/css/login.css`, etc.) to change the look and feel.
  
- **Data:**  
  Update `db.json` to modify user, recharge, and plan data.

- **Functionality:**  
  Adjust JavaScript files in the `Assets/js/` directory to customize behavior.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or support, please contact [hephzibahantony11@gmail.com].
```

