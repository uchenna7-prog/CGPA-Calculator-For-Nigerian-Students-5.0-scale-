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

        window.addEventListener("load",this.loadPage.bind(this))
       
        

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
        this.course.addEventListener("input",()=>{
            this.storeEntries()
        })

        this.courseUnit = document.createElement("input")
        this.courseUnit.setAttribute("class","course-unit-container")
        this.courseUnit.addEventListener("input",function(){
            if(isNaN(this.value)){
                alert("you are to enter only numbers in this column")
            }
            })
        this.courseUnit.addEventListener("input",()=>{
            this.storeEntries()
        })

        this.gradeOption = document.createElement("select")
        this.gradeOption.setAttribute("class","grade-option-container")
        this.gradeOption.addEventListener("change",()=>{
            this.storeEntries()
        })

        for(let i = 0; i < this.grades.length; i++){
            let option = document.createElement("option")
            option.textContent = this.grades[i]
            this.gradeOption.appendChild(option)
        }
        this.deleteCourseButton = document.createElement("button")
        this.deleteCourseButton.innerHTML = `<i class="fa-solid fa-trash"></i>`
        this.deleteCourseButton.setAttribute("id",`delete-button${this.courseNumber}`)
        this.deleteCourseButton.setAttribute("class","delete-course-button")
        this.deleteCourseButton.addEventListener("click",this.deleteCourse.bind(this))

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
            this.newTableRow.setAttribute("id",`table-row${this.courseNumber}`)
            this.newTableRow.setAttribute("class","table-row")

            this.newSerialNumTableData = document.createElement("td")
            this.newCourseTableData = document.createElement("td") 
            this.newCourseUnitTableData = document.createElement("td")
            this.newGradeTableData = document.createElement("td")
            this.newDeleteButtonTableData = document.createElement("td")

            this.newSerialNumTableData.textContent = this.courseNumber
            this.newSerialNumTableData.setAttribute("class","serial-number")

            this.newCourse = document.createElement("input")
            this.newCourse.setAttribute("class","course-container")
            this.newCourse.addEventListener("input",function(){
                this.value = this.value.toUpperCase()
            })
            this.newCourse.addEventListener("input",()=>{
                this.storeEntries()
            })

            this.newCourseUnit = document.createElement("input")
            this.newCourseUnit.setAttribute("class","course-unit-container")
            this.newCourseUnit.addEventListener("input",function(){
                if(isNaN(this.value)){
                    alert("you are to enter only numbers in this column")
                }
            })
            this.newCourseUnit.addEventListener("input",()=>{
                this.storeEntries()
            })


            this.newGradeOptionContainer = document.createElement("select")
            this.newGradeOptionContainer.setAttribute("class","grade-option-container")
            this.newGradeOptionContainer.addEventListener("change",()=>{
                this.storeEntries()
            })
            for(let i = 0; i < this.grades.length; i++){
                this.option = document.createElement("option")
                this.option.textContent = this.grades[i]
                this.newGradeOptionContainer.appendChild(this.option)
            }
            this.newDeleteButton = document.createElement("button")
            this.newDeleteButton.setAttribute("class","delete-button")
            this.newDeleteButton.setAttribute("id",`delete-button${this.courseNumber}`)
            this.newDeleteButton.addEventListener("click",this.deleteCourse.bind(this))
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

        localStorage.setItem("coursesAdded",JSON.stringify(this.coursesAdded))
        localStorage.setItem("courseUnitsAdded",JSON.stringify(this.courseUnitsAdded))
        localStorage.setItem("gradesAdded",JSON.stringify(this.gradesAdded))

        

    }

    deleteAllCourses(){
        this.gpaContainer.textContent = ""

        if(this.deletedAllCourses)(
            alert("No course to delete for this semester")
        )
        else{
            this.deletedAllCourses = true
            this.table.remove()
        }
        

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

    deleteCourse(event){
        this.deleteButtonId = event.currentTarget.id
        this.rowIdToDelete =   this.deleteButtonId.replace("delete-button","table-row")
        this.tableRowToDelete = document.getElementById(this.rowIdToDelete)
        this.tableRowToDelete.remove()

        this.serialNumbersContainers = document.getElementsByClassName("serial-number")
        for(let i = 0; i < this.serialNumbersContainers.length;i++){
            this.serialNumbersContainers[i].textContent = i+1
            this.courseNumber = i+1
        }

        this.tableRowContainers = document.getElementsByClassName("table-row")
      
        for(let i = 0; i < this.tableRowContainers.length;i++){
            this.tableRowContainers[i].id = `table-row${i+1}`
        }

        this.deleteButtonContainers = document.getElementsByClassName("delete-button")
        for(let i = 0; i < this.deleteButtonContainers.length;i++){
            this.deleteButtonContainers[i].id = `delete-button${i+1}`
        }

        if(this.tableRowContainers.length === 0){
            this.courseNumber = 0
        }

    }

    loadPage(){
        this.coursesAdded = JSON.parse(localStorage.getItem("coursesAdded"))|| []
        this.courseUnitsAdded = JSON.parse(localStorage.getItem("courseUnitsAdded"))|| []
        this.gradesAdded = JSON.parse(localStorage.getItem("gradesAdded"))|| []

        if(this.coursesAdded.length  > 0){
            for(let i = 0; i < (this.coursesAdded.length)-1;i++){
                this.addCourse()    
            }
            this.courseContainers = document.getElementsByClassName("course-container")
            for(let i = 0; i < this.courseContainers.length;i++){
                this.courseContainers[i].value = this.coursesAdded[i]
            }
            this.courseUnitContainers = document.getElementsByClassName("course-unit-container")
            for(let i = 0; i < this.courseUnitContainers.length;i++){
                this.courseUnitContainers[i].value = this.courseUnitsAdded[i]
            }
            this.gradeContainers = document.getElementsByClassName("grade-option-container")
            for(let i = 0; i < this.gradeContainers.length;i++){
                this.gradeContainers[i].value = this.gradesAdded[i]
            }

        }

        

    }


        
        

    
}


gpaCalc = new gpaCalculator()