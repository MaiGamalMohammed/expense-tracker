🧾 Expense Tracker CLI Tool
A lightweight and efficient command-line tool for tracking personal expenses. Easily add, delete, list, and summarize your spending—all through terminal commands.

project url: https://roadmap.sh/projects/expense-tracker

📦 Features
Add new expenses with a description and amount

Delete expenses by ID

List all expenses or filter by category

Get a summary of total spending, optionally filtered by month

🚀 Installation
```
npm i
npm link
```
💡 npm link allows you to use the global command expense-tracker instead of running the file manually.

🧑‍💻 Clone the project
```
git clone https://github.com/MaiGamalMohammed/expense-tracker.git
cd expense-tracker
```

Run the script
```
expense-tracker <command> [parameters]
```

 
## ⚙ Available Commands

| Command  | Description                                 | Example                                                         |
|----------|---------------------------------------------|-----------------------------------------------------------------|
| `add`    | Add a new expense                           | `expense-tracker add --description "Coffee" --amount 25 --category "food"` |
| `delete` | Delete an expense by ID                     | `expense-tracker delete --id 3`                                 |
| `list`   | List all expenses or filter by category     | `expense-tracker list`  <br> `expense-tracker list --category "shopping"` |
| `summery`| Get total spending (optionally by month)    | `expense-tracker summery` <br> `expense-tracker summery --month 7` |


🗃 Data Format
All expenses are stored in expenses.json with this structure:
```
json
{
  "id": 1,
  "description": "Coffee",
  "amount": 25,
  "category": "Food",
  "createdAt": "2025-07-29T18:45:00.000Z"
}
```

