class gpaCalculator{
    constructor(){

        this.coursesAdded = []
        this.courseUnitsAdded = []
        this.gradeOptionAdded = []
        this.gradePoints = []
        this.coursesTotalGradePoints = []
        this.courseNumber = 1

        this.grades = ["A","B","C","D","E","F"]

        this.addCourseButton = document.getElementById("add-course-button")
        this.deleteAllCoursesButton = document.getElementById("delete-all-courses-button")
        this.calculateGpaButton = document.getElementById("calculate-gpa-button")

        this.addCourseButton.addEventListener("click",this.addCourse.bind(this))
        this.deleteAllCoursesButton.addEventListener("click",this.deleteAllCourses.bind(this))
        this.calculateGpaButton.addEventListener("click",this.calculateGpa.bind(this))

        this.semesterTable = document.getElementById("semester-table")

    }

    addCourse(){
        this.newTableRow = document.createElement("tr")

        this.newSerialNumTableData = document.createElement("td")
        this.newCourseTableData = document.createElement("td") 
        this.newCourseUnitTableData = document.createElement("td")
        this.newGradeTableData = document.createElement("td")
        this.newDeleteButtonTableData = document.createElement("td")

        this.newSerialNumTableData.textContent = this.courseNumber += 1

        this.newCourse = document.createElement("input")
        this.newCourse.setAttribute("class","course-container")
        this.newCourse.addEventListener("input",function(){
            this.value = this.value.toUpperCase()
        })

        this.newCourseUnit = document.createElement("input")
        this.newCourseUnit.setAttribute("class","course-unit-container")
        this.newCourseunit.addEventListener("input",function(){
            if(isNaN(this.value)){
                alert("you are to enter only numbers in this column")
            }
        })


        this.newGradeOptionContainer = document.createElement("select")
        this.newGradeOptionContainer.setAttribute("class","grade-option-container")
        for(let i = 0; i < this.grades.length; i++){
            this.option = document.createElement("option")
            this.option.textContent = this.grades[i]
            this.newGradeOptionContainer.appendChild(this.option)
        }
        this.newDeleteButton = document.createElement("button")

        this.newCourseTableData.appendChild(this.newCourse)
        this.newCourseUnitTableData.appendChild(this.newCourseUnit)
        this.newGradeTableData.appendChild(this.newGradeOptionContainer)
        this.newDeleteButtonTableData.appendChild(this.newDeleteButton)


        this.newTableRow.appendChild(this.newSerialNumTableData)
        this.newTableRow.appendChild(this.newCourseTableData)
        this.newTableRow.appendChild(this.newCourseUnitTableData)
        this.newTableRow.appendChild(this.newGradeTableData)
        this.newTableRow.appendChild(this.newDeleteButtonTableData)

        this.semesterTable.appendChild(this.newTableRow)
        
    }

    storeEntries(){

    }

    deleteAllCourses(){

    }

    calculateGpa(){

    }
}


gpaCalc = new gpaCalculator()