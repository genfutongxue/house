function Person() {
    this.name = "小明";
}

function Student() {
    this.age = 15;
}
//要让Student继承Person的属性和方法
Student.prototype = new Person();
Student.prototype.constructor = Student;
const student1 = new Student();
console.log(student1.name, student1.age);

//继承的关键是子类的隐式原型对象用父类的实例化对象，这样就可以用父类的方法和属性了，但是因为改变了子类的显示原型，那么它的构造器也跟着改变了，所以要改回子类自己