class gpaCalculator{
    constructor(){

        this.coursesAdded = []
        this.courseUnitsAdded = []
        this.gradesAdded = []
        this.gradePoints = []
        this.coursesTotalGradePoints = []
        this.courseNumber = 1

        this.grades = ["A","B","C","D","E","F"]

        this.gpaContainer = document.createElement("div")
        this.gpaContainer.setAttribute("id","gpa-container")

        this.addCourseButton = document.getElementById("add-course-button")
        this.deleteAllCoursesButton = document.getElementById("delete-all-courses-button")
        this.calculateGpaButton = document.getElementById("calculate-gpa-button")

        this.addCourseButton.addEventListener("click",this.addCourse.bind(this))
        this.deleteAllCoursesButton.addEventListener("click",this.deleteAllCourses.bind(this))
        this.calculateGpaButton.addEventListener("click",this.calculateGpa.bind(this))

        this.detailsContainer = document.getElementById("details-container")
        this.buttonContainer = document.getElementById("button-container")
        this.createSemesterTable()

        this.semesterTable = document.getElementById("semester-table")

        this.deletedAllCourses = false

       
        

    }

    createSemesterTable(){

        this.table = document.createElement("table")
        this.table.setAttribute("id","semester-table")

        this.thead = document.createElement("thead")
        this.trHead = document.createElement("tr")

        this.thSerialNumbers = document.createElement("th")
        this.thCourses = document.createElement("th")
        this.thCourseUnits = document.createElement("th")
        this.thGrades = document.createElement("th")
        this.thDeleteBtns = document.createElement("th")

        this.thSerialNumbers.textContent = "S/N"
        this.thCourses.textContent = "COURSE CODES"
        this.thCourseUnits.textContent = "COURSE UNITS"
        this.thGrades.textContent = "GRADES"
        this.thDeleteBtns.textContent = ""

        this.trHead.appendChild(this.thSerialNumbers)
        this.trHead.appendChild(this.thCourses)
        this.trHead.appendChild(this.thCourseUnits)
        this.trHead.appendChild(this.thGrades)
        this.trHead.appendChild(this.thDeleteBtns)

        this.table.appendChild(this.trHead)

        this.tbody = document.createElement("tbody")
        this.trBody = document.createElement("tr")
        this.trBody.setAttribute("id",`table-row${this.courseNumber}`)
        this.trBody.setAttribute("class","table-row")


        this.tdSN = document.createElement("td")
        this.tdCourse = document.createElement("td")
        this.tdCourseUnit = document.createElement("td")
        this.tdGrade = document.createElement("td")
        this.tdDeleteCourseButton = document.createElement("td")

        this.tdSN.textContent = `${this.courseNumber}`
        this.tdSN.setAttribute("class","serial-number")
        this.course = document.createElement("input")
        this.course.setAttribute("class", "course-container")
        this.course.addEventListener("input",function(){
            this.value = this.value.toUpperCase()
        })

        this.courseUnit = document.createElement("input")
        this.courseUnit.setAttribute("class","course-unit-container")
        this.courseUnit.addEventListener("input",function(){
                if(isNaN(this.value)){
                    alert("you are to enter only numbers in this column")
                }
            })

        this.gradeOption = document.createElement("select")
        this.gradeOption.setAttribute("class","grade-option-container")

        for(let i = 0; i < this.grades.length; i++){
            let option = document.createElement("option")
            option.textContent = this.grades[i]
            this.gradeOption.appendChild(option)
        }
        this.deleteCourseButton = document.createElement("button")
        this.deleteCourseButton.innerHTML = `<i class="fa-solid fa-trash"></i>`
        this.deleteCourseButton.setAttribute("id",`delete-course-button${this.courseNumber}`)
        this.deleteCourseButton.setAttribute("class","delete-course-button")
        this.deleteCourseButton.addEventListener("click",this.deleteCourse)

        this.tdCourse.appendChild(this.course)
        this.tdCourseUnit.appendChild(this.courseUnit)
        this.tdGrade.appendChild(this.gradeOption)
        this.tdDeleteCourseButton.appendChild(this.deleteCourseButton)

        this.trBody.appendChild(this.tdSN)
        this.trBody.appendChild(this.tdCourse)
        this.trBody.appendChild(this.tdCourseUnit)
        this.trBody.appendChild(this.tdGrade)
        this.trBody.appendChild(this.tdDeleteCourseButton)

        this.tbody.appendChild(this.trBody)
        
        this.table.appendChild(this.tbody)
        this.detailsContainer.insertBefore(this.table,this.buttonContainer)
        this.detailsContainer.insertBefore(this.gpaContainer,this.buttonContainer)

    }

    addCourse(){
        if(this.deletedAllCourses){
            this.courseNumber = 1
            this.createSemesterTable()
            this.deletedAllCourses = false
            this.semesterTable = document.getElementById("semester-table")

        }
        else{

            this.courseNumber += 1
            this.newTableRow = document.createElement("tr")

            this.newSerialNumTableData = document.createElement("td")
            this.newCourseTableData = document.createElement("td") 
            this.newCourseUnitTableData = document.createElement("td")
            this.newGradeTableData = document.createElement("td")
            this.newDeleteButtonTableData = document.createElement("td")

            this.newSerialNumTableData.textContent = this.courseNumber

            this.newCourse = document.createElement("input")
            this.newCourse.setAttribute("class","course-container")
            this.newCourse.addEventListener("input",function(){
                this.value = this.value.toUpperCase()
            })

            this.newCourseUnit = document.createElement("input")
            this.newCourseUnit.setAttribute("class","course-unit-container")
            this.newCourseUnit.addEventListener("input",function(){
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
            this.newDeleteButton.setAttribute("class","delete-button")
            this.newDeleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>'


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

        }
        

    storeEntries(){
        this.coursesAdded = []
        this.courseUnitsAdded = []
        this.gradesAdded = []
        this.gradePoints = []
        this.coursesTotalGradePoints = []

        let courses = document.getElementsByClassName("course-container")
        let courseUnits = document.getElementsByClassName("course-unit-container")
        let grades = document.getElementsByClassName("grade-option-container")

        for(let i = 0; i < courseUnits.length; i++ ){
            this.coursesAdded.push(courses[i].value)

            this.courseUnitsAdded.push(parseFloat(courseUnits[i].value))
            
            this.gradesAdded.push(grades[i].value)

            switch(grades[i].value){
                case "A":
                    this.gradePoints.push(5)
                    break
                case "B":
                    this.gradePoints.push(4)
                    break
                case "C":
                    this.gradePoints.push(3)
                    break
                case "D":
                    this.gradePoints.push(2)
                    break
                case "E":
                    this.gradePoints.push(1)
                    break
                default:
                    this.gradePoints.push(0)
                
            }
            this.coursesTotalGradePoints.push(parseFloat(this.courseUnitsAdded[i]) * parseFloat(this.gradePoints[i]))
        }

        

    }

    deleteAllCourses(){
        this.deletedAllCourses = true
        this.semesterTable.remove()
        this.courseNumber = 0
        this.gpaContainer.textContent = ""
        

    }

    calculateGpa(){
        this.storeEntries()

        this.coursesTotalGradePointsSum = this.coursesTotalGradePoints.reduce((accumulator,initialValue)=>accumulator + initialValue,0)
        this.courseUnitsAddedSum = this.courseUnitsAdded.reduce((accumulator,initialValue)=>accumulator + initialValue,0)

        this.gpa = this.coursesTotalGradePointsSum / this.courseUnitsAddedSum
        if(isNaN(this.gpa)){
            alert("your are to enter only numbers in the course unit column\nMake sure you fill all added field")
        }
        else{
            this.gpaContainer.textContent = `GPA: ${this.gpa.toFixed(2)}`
        }
        

    }

    deleteCourse(){}
        
        

    
}


gpaCalc = new gpaCalculator()