const mongoose = require("mongoose");

// ---------------------------Connect Mongoose----------------------------------------------
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("connected to mongoodb"))
  .catch((err) => console.err("error"));

// -----------------------------------------------Create Schema------------------------------------------------------
const courseSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

// --------------------------------------------------C-reate Model-------------------------------------------
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "javascript course",
    price: 400,
  });

  const result = await course.save();
  console.log(result);
}
// createCourse();

// -------------------------------------------R-ead Course-------------------------------------
async function getCourses() {
  const courses = await Course.find({ price: { $gt: 90 } })
    .limit(10)
    .sort("-price")
    .select("name price");
  console.log(courses);
}
// getCourses()

// ---------------------------------------U-pdate Course-----------------------------------------
async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;

  course.name = "namaste js";
  course.price = 500;

  const result = await course.save();
  console.log(result);
}
// updateCourse("64dd14c2dc6d98585c1033d6");

// -----------------------------------------------D-elete Course-------------------------------------------------
async function removeCourse(id) {
  //   const result = await Course.deleteOne({ _id: id });
  const deleteCoruse = await Course.findByIdAndRemove(id);
  console.log(deleteCoruse);
}

removeCourse("64dd13676e92bd048cb9afdf");

// getCourses();
