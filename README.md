# Expense Tracker with OCR

A full-stack Java application for tracking expenses with OCR-powered receipt scanning. Built with Spring Boot backend and React frontend.

## Features

- 📋 **Expense Management**: Add, view, update, and delete expenses
- 📷 **OCR Receipt Scanning**: Upload receipt images and automatically extract expense information
- 📊 **Expense Summary**: View total expenses and breakdown by category
- 🏷️ **Category Management**: Organize expenses by categories
- 💾 **Data Persistence**: H2 in-memory database (easily switchable to MySQL/PostgreSQL)

## Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **H2 Database** (development)
- **Tesseract OCR** (Tess4J)
- **Maven**

### Frontend
- **React 18**
- **Axios** for API calls
- **Modern CSS** with responsive design

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- Node.js 16+ and npm
- Tesseract OCR installed on your system

### Installing Tesseract OCR

#### Windows
1. Download Tesseract from: https://github.com/UB-Mannheim/tesseract/wiki
2. Install it (default location: `C:\Program Files\Tesseract-OCR`)
3. Add Tesseract to your system PATH, or update `application.properties` with the path

#### macOS
```bash
brew install tesseract
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get install tesseract-ocr
```

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Expense Tracker with OCR"
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Build and run the Spring Boot application:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

**Note**: If Tesseract is not in the default location, update `backend/src/main/resources/application.properties`:
```properties
tess4j.datapath=C:/Program Files/Tesseract-OCR/tessdata
```

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the React development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## Project Structure

```
Expense Tracker with OCR/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/expensetracker/
│   │   │   │   ├── controller/     # REST controllers
│   │   │   │   ├── model/          # Entity models
│   │   │   │   ├── repository/     # Data repositories
│   │   │   │   ├── service/        # Business logic
│   │   │   │   └── ExpenseTrackerApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## API Endpoints

### Expenses
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/{id}` - Get expense by ID
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/{id}` - Update expense
- `DELETE /api/expenses/{id}` - Delete expense
- `GET /api/expenses/category/{category}` - Get expenses by category
- `GET /api/expenses/total` - Get total expenses
- `GET /api/expenses/date-range?startDate=&endDate=` - Get expenses by date range

### Receipt Upload
- `POST /api/expenses/upload-receipt` - Upload receipt image for OCR processing

## Usage

1. **Add Expense Manually**:
   - Click on "Add Expense" tab
   - Fill in the form with expense details
   - Click "Add Expense"

2. **Upload Receipt**:
   - Click on "Upload Receipt" tab
   - Select a receipt image file
   - Click "Upload & Process Receipt"
   - The system will automatically extract expense information using OCR

3. **View Expenses**:
   - Click on "Expenses" tab to see all expenses
   - Expenses are displayed in cards with all details

4. **View Summary**:
   - Click on "Summary" tab
   - See total expenses and category breakdown

## Configuration

### Database Configuration

The application uses H2 in-memory database by default. To switch to MySQL or PostgreSQL:

1. Update `pom.xml` to include the appropriate database driver
2. Update `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/expensedb
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

### OCR Configuration

Tesseract OCR language can be configured in `OCRService.java`. Default is English (`eng`).

## Development

### Running Tests
```bash
cd backend
mvn test
```

### Building for Production

**Backend**:
```bash
cd backend
mvn clean package
java -jar target/expense-tracker-backend-1.0.0.jar
```

**Frontend**:
```bash
cd frontend
npm run build
```

## Troubleshooting

### OCR Not Working
- Ensure Tesseract OCR is installed
- Check the `tess4j.datapath` in `application.properties`
- Verify the image file format is supported (JPG, PNG, GIF)

### CORS Errors
- Ensure the backend is running on port 8080
- Check CORS configuration in `ExpenseController.java`

### Database Issues
- H2 console is available at `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:expensedb`
- Username: `sa`
- Password: (empty)

## Future Enhancements

- User authentication and multi-user support
- Export expenses to CSV/PDF
- Advanced OCR with better text extraction
- Receipt image storage and retrieval
- Expense analytics and charts
- Mobile app support

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

