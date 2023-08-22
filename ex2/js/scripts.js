const salary = () => {
    let control = 100
    let arr = new Array();
    while (control < 1000) {
        const salary = control * 15;
        control = control + 100;
        arr.push(salary);
    }
    return arr;
};

const salaryPlus = salary().map(element => {
  if (element <= 2000) return Number((element * 1.15).toFixed(2));
  else return Number((element * 1.10).toFixed(2));
});

const salaryHeight = salaryPlus.filter(element => element > 2500);

const salaryHight2500 = salaryHeight.reduce((total, element) => total + element, 0);

console.log("Salários", salary());
salaryPlus.forEach(element => console.log("Com aumento:", element));
salaryHeight.forEach(element => console.log("Superiores a 2500:", element));
console.log("Soma superiores a 2500:", salaryHight2500)