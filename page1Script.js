  class CGPACalculator {
    constructor(){

        this.mainContainer = document.querySelector("main")
        this.CGPACalculatorButtonContainer = document.getElementById("cgpa-control-button-container")

        this.semestersAdded = []

        this.allSmestersCourses = []
        this.allSemestersCourseUnits = []
        this.allSemestersGrades = []
        this.allSemestersGradePoints = []

        this.semesters = {"First":1,"Second":2}
        this.currentSemster = 1
        this.currentYear = 1

        this.addSemesterButton = document.getElementById("add-semester-button")
        this.removeSemesterButton = document.getElementById("remove-semester-button")
        this.calculateCgpaButton = document.getElementById("calculate-cgpa-button")

        this.addSemester = this.addSemester.bind(this)
        this.addSemesterButton.addEventListener("click",this.addSemester)

        this.removeSemester = this.removeSemester.bind(this)
        this.removeSemesterButton.addEventListener("click",this.removeSemester)

        this.calculateCgpa = this.calculateCgpa.bind(this)
        this.calculateCgpaButton.addEventListener("click",this.calculateCgpa)

        this.year1Semester1 = new Semester(this.currentSemster,this.currentYear)
        this.year1Semester1Container = this.year1Semester1.semesterContainer
        this.year1Container = document.createElement("h2")
        this.year1Container.setAttribute("id","year1-container")
        this.year1Container.textContent = `YEAR ${this.currentYear}`
        this.semestersAdded.push(this.year1Semester1)
        this.mainContainer.insertBefore(this.year1Container,this.year1Semester1Container)

        this.cgpaContainer = document.createElement("div")
        this.cgpaContainer.setAttribute("id","cgpa-container")

    }

    addSemester(){
        
        if(this.currentSemster === this.semesters["First"]){
            this.currentSemster = this.semesters["Second"]

        }
        else{
            this.currentSemster = this.semesters["First"]
            this.currentYear += 1
            let yearContainer = document.createElement("h2")
            yearContainer.setAttribute("id",`year${this.currentYear}-container`)
            yearContainer.textContent = `YEAR ${this.currentYear}`
            this.mainContainer.insertBefore(yearContainer,this.CGPACalculatorButtonContainer)

        }

        let semester = new Semester(this.currentSemster,this.currentYear)
        this.semestersAdded.push(semester)
            
    }


    removeSemester(){
        this.lastSemesterAdded = this.semestersAdded.pop()
        this.lastSemesterAdded.detailsContainer.remove()
        if(this.lastSemesterAdded.currentSemster === 1){
            let yearContainer = document.getElementById(`year${this.currentYear}-container`)
            yearContainer.remove()
            this.currentYear -= 1
        }
        this.lastSemesterAdded.semesterContainer.remove()
        if(this.currentSemster === this.semesters["First"]){
            this.currentSemster = this.semesters["Second"]

        }
        else{
            this.currentSemster = this.semesters["First"]
        }


    }

    calculateCgpa(){

        this.allSemestersCourseUnits = []
        this.allSemestersGradePoints = []
        this.allCoursesTotalGradePoints = []
        for(let i = 0;i < this.semestersAdded.length; i++){
            let semester = this.semestersAdded[i]
            semester.StoreEntries()
            let semesterCourseUnits = semester.courseUnitsAdded
            let semesterGradePoints = semester.gradePoints
            for(let j = 0; j < semesterCourseUnits.length;j++ ){
                this.allSemestersCourseUnits.push(semesterCourseUnits[j])
                this.allSemestersGradePoints.push(semesterGradePoints[j])
            }
        }
        for(let i = 0; i < this.allSemestersCourseUnits.length;i++){
            this.allCoursesTotalGradePoints.push(parseFloat(this.allSemestersCourseUnits[i])*parseFloat(this.allSemestersGradePoints[i]))

        }

        this.allCoursesTotalGradePointsSum = this.allCoursesTotalGradePoints.reduce((accumulator,initialValue)=>accumulator+initialValue,0)
        this.allSemestersCourseUnitsSum = this.allSemestersCourseUnits.reduce((accumulator,initialValue)=>accumulator+initialValue,0)
        this.cgpa = this.allCoursesTotalGradePointsSum / this.allSemestersCourseUnitsSum

        if(isNaN(this.cgpa)){
            alert("your are to enter only numbers in the course unit column\nMake sure you fill all added field")
        }
        else{
            this.cgpaContainer.textContent = `CURRENT CGPA: ${this.cgpa.toFixed(2)}`
            this.mainContainer.insertBefore(this.cgpaContainer,this.CGPACalculatorButtonContainer)
        }
        

    
    }

}


class Semester{
    constructor(currentSemster,year){

        this.mainContainer = document.querySelector("main")
        this.CGPACalculatorButtonContainer = document.getElementById("cgpa-control-button-container")

        
        this.courseNumber = 1
        this.semesters = {1:"First",2:"Second"}
        this.currentSemster = currentSemster
        this.year = year
        this.grades = ["A","B","C","D","E","F"]

        this.coursesAdded = []
        this.courseUnitsAdded = []
        this.gradesAdded = []
        this.gradePoints = []
        this.coursesTotalGradePoints = []

        this.detailsContainer = document.createElement("section")
        this.detailsContainer.setAttribute("id",`year${this.year}-semester${this.currentSemster}-container`)
        this.detailsContainer.setAttribute("class","details-container")
        

        this.createSemesterContainer()
        
        this.createSemesterTable()

        this.createAddCourseButton()
        this.createDeleteAllCoursesButton()
        this.createCalculateGpaButton()

        this.setUpControlButtons()
        
        
        this.gpaContainer = document.createElement("div")
        this.gpaContainer.setAttribute("class","gpa-container")

        this.mainContainer.insertBefore(this.detailsContainer,this.CGPACalculatorButtonContainer)
        this.detailsContainer.insertBefore(this.gpaContainer,this.ControlbuttonsContainer)


        this.deletedAllCourses = false
    }

    createSemesterContainer(){
        this.semesterContainer = document.createElement("h2")
        this.semesterContainer.textContent = `${this.semesters[this.currentSemster]} Semester`
        this.mainContainer.insertBefore(this.semesterContainer,this.CGPACalculatorButtonContainer)
        
    }

    createSemesterTable(){

        this.table = document.createElement("table")
        this.table.setAttribute("id",`year${this.year}-semester${this.currentSemster}-table`)
        this.table.setAttribute("class","semester-table")

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
        this.trBody.setAttribute("id",`year${this.year}-semester${this.currentSemster}-table-row${this.courseNumber}`)
        this.trBody.setAttribute("class",`year${this.year}-semester${this.currentSemster}-table-row`)


        this.tdSN = document.createElement("td")
        this.tdCourse = document.createElement("td")
        this.tdCourseUnit = document.createElement("td")
        this.tdGrade = document.createElement("td")
        this.tdDeleteCourseButton = document.createElement("td")

        this.tdSN.textContent = `${this.courseNumber}`
        this.tdSN.setAttribute("class",`year${this.year}-semester${this.currentSemster}-serial-number`)
        this.course = document.createElement("input")
        this.course.setAttribute("class",`year${this.year}-semester${this.currentSemster}-course course-container`)
        this.course.addEventListener("input",function(){
            this.value = this.value.toUpperCase()
        })

        this.courseUnit = document.createElement("input")
        this.courseUnit.setAttribute("class",`year${this.year}-semester${this.currentSemster}-course-unit course-unit-container`)
        this.courseUnit.addEventListener("input",function(){
                if(isNaN(this.value)){
                    alert("you are to enter only numbers in this column")
                }
            })

        this.gradeOption = document.createElement("select")
        this.gradeOption.setAttribute("class",`year${this.year}-semester${this.currentSemster}-grade-option grade-option-container`)

        for(let i = 0; i < this.grades.length; i++){
            let option = document.createElement("option")
            option.textContent = this.grades[i]
            this.gradeOption.appendChild(option)
        }
        this.deleteCourseButton = document.createElement("button")
        this.deleteCourseButton.innerHTML = `<i class="fa-solid fa-trash"></i>`
        this.deleteCourseButton.setAttribute("id",`year${this.year}-semester${this.currentSemster}-delete-course-button${this.courseNumber}`)
        this.deleteCourseButton.setAttribute("class",`year${this.year}-semester${this.currentSemster}-delete-course-button`)
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
        this.detailsContainer.appendChild(this.table)

    }

    addCourse(){
        if(this.deletedAllCourses){
            this.courseNumber = 1
            this.createSemesterTable()
            this.detailsContainer.insertBefore(this.table,this.ControlbuttonsContainer)
            this.deletedAllCourses = false
        }
        else{
            this.courseNumber += 1

            this.newTrBody = document.createElement("tr")
            this.newTrBody.setAttribute("id",`year${this.year}-semester${this.currentSemster}-table-row${this.courseNumber}`)
            this.newTrBody.setAttribute("class",`year${this.year}-semester${this.currentSemster}-table-row`)

            this.newTdSN = document.createElement("td")
            this.newTdCourse = document.createElement("td")
            this.newTdCourseUnit = document.createElement("td")
            this.newTdGrade = document.createElement("td")
            this.newTdDeleteCourseButton = document.createElement("td")

            this.newTdSN.textContent = `${this.courseNumber}`
            this.newTdSN.setAttribute("class",`year${this.year}-semester${this.currentSemster}-serial-number`)
            this.newCourse = document.createElement("input")
            this.newCourse.setAttribute("class",`year${this.year}-semester${this.currentSemster}-course course-container`)
            this.newCourse.addEventListener("input",function(){
                this.value = this.value.toUpperCase()
            })

            this.newCourseUnit = document.createElement("input")
            this.newCourseUnit.setAttribute("class",`year${this.year}-semester${this.currentSemster}-course-unit course-unit-container`)
            this.newCourseUnit.addEventListener("input",function(){
                if(isNaN(this.value)){
                    alert("you are to enter only numbers in this column")
                }
            })

            this.newGradeOption = document.createElement("select")
            this.newGradeOption.setAttribute("class",`year${this.year}-semester${this.currentSemster}-grade-option grade-option-container`)

            for(let i = 0; i < this.grades.length; i++){
                let option = document.createElement("option")
                option.textContent = this.grades[i]
                this.newGradeOption.appendChild(option)
        }
            this.newDeleteCourseButton = document.createElement("button")
            this.newDeleteCourseButton.innerHTML = `<i class="fa-solid fa-trash"></i>`
            this.newDeleteCourseButton.setAttribute("id",`year${this.year}-semester${this.currentSemster}-delete-course-button${this.courseNumber}`)
            this.newDeleteCourseButton.setAttribute("class",`year${this.year}-semester${this.currentSemster}-delete-course-button`)
            this.newDeleteCourseButton.addEventListener("click",this.deleteCourse.bind(this))

            this.newTdCourse.appendChild(this.newCourse)
            this.newTdCourseUnit.appendChild(this.newCourseUnit)
            this.newTdGrade.appendChild(this.newGradeOption)
            this.newTdDeleteCourseButton.appendChild(this.newDeleteCourseButton)

            this.newTrBody.appendChild(this.newTdSN)
            this.newTrBody.appendChild(this.newTdCourse)
            this.newTrBody.appendChild(this.newTdCourseUnit)
            this.newTrBody.appendChild(this.newTdGrade)
            this.newTrBody.appendChild(this.newTdDeleteCourseButton)

            this.tbody.appendChild(this.newTrBody)
        }


    }

    createAddCourseButton(){
        this.addCourseButton = document.createElement("button")
        this.addCourseButton.setAttribute("id",`year${this.year}-semester${this.currentSemster}-add-course-button`)
        this.addCourseButton.setAttribute("class","add-course-button")
        this.addCourseButton.textContent = "ADD COURSE"
        this.addCourse = this.addCourse.bind(this)
        this.addCourseButton.addEventListener("click",this.addCourse)

    }
    createDeleteAllCoursesButton(){
        this.deleteAllCoursesButton = document.createElement("button")
        this.deleteAllCoursesButton.setAttribute("id",`year${this.year}-semester${this.currentSemster}-delete-all-courses-button`)
        this.deleteAllCoursesButton.setAttribute("class","delete-all-courses-button")
        this.deleteAllCoursesButton.textContent = "DELETE ALL COURSES"
        this.deleteAllCourses = this.deleteAllCourses.bind(this)
        this.deleteAllCoursesButton.addEventListener("click",this.deleteAllCourses)

    }
    createCalculateGpaButton(){
        this.calculateGpaButton = document.createElement("button")
        this.calculateGpaButton.setAttribute("id",`year${this.year}-semester${this.currentSemster}-calculate-gpa-button`)
        this.calculateGpaButton.setAttribute("class","calculate-gpa-button")
        this.calculateGpaButton.textContent = "CALCULATE GPA"
        this.calculateGpa = this.calculateGpa.bind(this)
        this.calculateGpaButton.addEventListener("click",this.calculateGpa)

        
    }

    setUpControlButtons(){
        this.ControlbuttonsContainer = document.createElement("div")
        this.ControlbuttonsContainer.setAttribute("class","button-container")

        this.ControlbuttonsContainer.appendChild(this.addCourseButton)
        this.ControlbuttonsContainer.appendChild(this.deleteAllCoursesButton)
        this.ControlbuttonsContainer.appendChild(this.calculateGpaButton)

        
        this.detailsContainer.appendChild(this.ControlbuttonsContainer)

        
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

    StoreEntries(){
        this.coursesAdded = []
        this.courseUnitsAdded = []
        this.gradesAdded = []
        this.gradePoints = []
        this.coursesTotalGradePoints = []

        let courses = document.getElementsByClassName(`year${this.year}-semester${this.currentSemster}-course`)
        let courseUnits = document.getElementsByClassName(`year${this.year}-semester${this.currentSemster}-course-unit`)
        let grades = document.getElementsByClassName(`year${this.year}-semester${this.currentSemster}-grade-option`)

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

    calculateGpa(){
        this.StoreEntries()

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
        this.rowIdToDelete =   this.deleteButtonId.replace("delete-course-button","table-row")
        this.tableRowToDelete = document.getElementById(this.rowIdToDelete)
        this.tableRowToDelete.remove()

        let nums = this.deleteButtonId.match(/\d+/g)
        nums = nums.map(Number)

        this.serialNumberClass = `year${nums[0]}-semester${nums[1]}-serial-number`
        this.serialNumbersContainers = document.getElementsByClassName(this.serialNumberClass)
        for(let i = 0; i < this.serialNumbersContainers.length;i++){
            this.serialNumbersContainers[i].textContent = i+1
            this.courseNumber = i+1
        }

        this.tableRowsClass = `year${nums[0]}-semester${nums[1]}-table-row`
        this.tableRowContainers = document.getElementsByClassName(this.tableRowsClass)
        for(let i = 0; i < this.tableRowContainers.length;i++){
            this.tableRowContainers[i].id = `year${nums[0]}-semester${nums[1]}-table-row${i+1}`
        }

        this.deleteButtonsClass = `year${nums[0]}-semester${nums[1]}-delete-course-button`
        this.deleteButtonContainers = document.getElementsByClassName(this.deleteButtonsClass)
        for(let i = 0; i < this.deleteButtonContainers.length;i++){
            this.deleteButtonContainers[i].id = `year${nums[0]}-semester${nums[1]}-delete-course-button${i+1}`
        }

        if(this.tableRowContainers.length === 0){
            console.log(this.tableRowContainers.length)
            console.log(this.courseNumber)
            this.courseNumber = 0
        }

    }

}

CGPACalc = new CGPACalculator()
