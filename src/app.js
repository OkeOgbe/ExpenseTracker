const firebaseConfig = {
	apiKey: "AIzaSyBDcx9iewWysFUEzVCHGxTSrvk7NABUqs0",
	authDomain: "expense-tracker-8c7a5.firebaseapp.com",
	databaseURL: "https://expense-tracker-8c7a5.firebaseio.com",
	projectId: "expense-tracker-8c7a5",
	storageBucket: "expense-tracker-8c7a5.appspot.com",
	messagingSenderId: "1037024490612",
	appId: "1:1037024490612:web:232708ad464b8027a7cd21",
	measurementId: "G-J11BC2NLKJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const signUp = document.querySelector(".authUser");
const home = document.querySelector("#index");
const dashboard = document.querySelector("#dashboard");
const username = document.querySelector("#username");
const photo = document.querySelector("#profilePic");
// const signOut = document.querySelector(".signOut");
const auth = firebase.auth();
signUp.addEventListener("click", function() {
	auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
		.then(function() {
			const provider = new firebase.auth.GoogleAuthProvider();
			return auth.signInWithPopup(provider);
		})
		.then(function() {
			home.style.display = "none";
			dashboard.style.display = "block";
			document.title = "Dashboard";
			var user = firebase.auth().currentUser;
			var name, email, photoUrl, uid, emailVerified;
			if (user != null) {
				username.textContent = user.displayName;
				name = user.displayName;
				email = user.email;
				photo.src = user.photoURL;
				emailVerified = user.emailVerified;
				uid = user.uid;
			}
		})
		.catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
		});
});
class Expense {
	constructor(payment, amount, date, desc) {
		this.payment = payment;
		this.amount = amount;
		this.date = date;
		this.desc = desc;
	}
}
class UI {
	addExpense(expense) {
		const
			expenseList = document.querySelector('#expense-list'),
			list = document.createElement('div');
		list.classList = "col-lg-6 p-0";
		list.innerHTML = `
		<div class="expense-card">
		<div>
				<p><span>Payment method:</span><br>${expense.payment} </p>
			<p><span>Amount Spent:</span><br>${expense.amount} </p>
			<p><span>Description:</span><br>${expense.desc} </p>
			<p><span>Date:</span><br>${expense.date} </p>
			<p> <a href="" class="delete">Delete </a> </p>
			</div>
			</div>
			`;
		expenseList.appendChild(list);
		$('#formModal').modal('hide');
	}
	showAlert(message, className) {
		const errBox = document.createElement('div');
		errBox.className = `alert ${className}`;
		errBox.appendChild(document.createTextNode(message));
		const container = document.querySelector('.container');
		const form = document.querySelector('#expense-form');
		container.insertBefore(errBox, form);
		setTimeout(function() {
			document.querySelector('.alert').remove();
		}, 3000);
	}
	deleteExpense(target) {
		if (target.className === 'delete') {
			target.parentElement.parentElement.remove();
			document.querySelector(".expense-card").style.background = "transparent";
		} else {}
	}
	clearFields() {
		document.querySelector('#payment').value = "";
		document.querySelector('#amount').value = "";
		document.querySelector('#desc').value = "";
		document.querySelector('#date').value = "";
	}
}
class Store {
	static fetchExpenses() {
		let expenses;
		if (localStorage.getItem('expenses') === null) {
			expenses = [];
		} else {
			expenses = JSON.parse(localStorage.getItem('expenses'));
		}
		return expenses;
	}
	static displayExpenses() {
		const expenses = Store.fetchExpenses();
		expenses.forEach(function(expense) {
			const ui = new UI;
			ui.addExpense(expense)
		})
	}
	static addExpenses(expense) {
		const expenses = Store.fetchExpenses();
		expenses.push(expense);
		localStorage.setItem('expenses', JSON.stringify(expenses));
	}
	static removeExpense(date) {
		const expenses = Store.fetchExpenses();
		expenses.forEach(function(expense, index) {
			if (expense.date = date) {
				expenses.splice(index, 1)
			}
		})
		localStorage.setItem('expenses', JSON.stringify(expenses));
	}
}
document.addEventListener('DOMContentLoaded', Store.displayExpenses);
document.querySelector('#expense-form').addEventListener('submit', function(e) {
	const
		payment = document.querySelector('#payment').value,
		amount = document.querySelector('#amount').value,
		date = document.querySelector('#date').value,
		desc = document.querySelector('#desc').value
	expense = new Expense(payment, amount, date, desc),
		ui = new UI();
	if (payment === '' || amount === '' || date === '' || desc === '') {
		ui.showAlert('Please fill in all fields', 'error');
	} else {
		ui.addExpense(expense);
		Store.addExpenses(expense);
		ui.showAlert('Expense Added', 'success');
	}
	ui.clearFields();
	e.preventDefault();
});
document.getElementById('expense-list').addEventListener('click', function(e) {
	const ui = new UI();
	ui.deleteExpense(e.target);
	Store.removeExpense(e.target.parentElement.previousElementSibling.textContent);
	ui.showAlert('Expense removed', 'success');
	e.preventDefault();
})
const slideOut = () => {
	document.getElementById("aside").classList.toggle("slide");
}
