const CACHE_KEY = "calculating_history" //Variabel ini digunakan sebagai key untuk mengakses dan menyimpan data pada localStorage.

function checkForStorage() {
    return typeof (Storage) !== "undefined"
}
//Lalu kita buat juga fungsi untuk menyimpan data riwayat kalkulasi pada localStorage. Fungsi tersebut memiliki satu argumen yang merupakan data dari hasil kalkulasi yang nantinya akan dimasukkan ke dalam localStorage.
function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) == null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }
        historyData.unshift(data);

        if (historyData.length > 5) {
            historyData.pop();

        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

//Fungsi ini mengembalikan nilai array dari localStorage jika sudah memiliki nilai sebelumnya melalui JSON.parse(). Namun jika localStorage masih kosong, fungsi ini akan mengembalikan nilai array kosong.
function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

//Lalu yang terakhir, kita tambahkan fungsi untuk merender data riwayat kalkulasi pada tabel HTML. Fungsi ini diberi nama dengan renderHistory().
function renderHistory() {
    const historyData = showHistory();
    let historyLIst = document.querySelector('#historyLIst');
    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";

    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        historyList.appendChild(row);

    }

}
renderHistory();