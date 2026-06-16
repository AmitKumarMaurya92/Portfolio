students = []

def add_student(name, roll_no, marks):
    student = {
        'name': name,
        'roll_no': roll_no,
        'marks': marks
    }
    students.append(student)

def show_students():
    if not students:
        print("No students found.")
        return

    for s in students:
        print(f"Name: {s['name']}, Roll No: {s['roll_no']}, Marks: {s['marks']}")

def search_student(roll_no):
    for s in students:
        if s['roll_no'] == roll_no:
            print("\nStudent Found:")
            print(f"Name: {s['name']}")
            print(f"Roll No: {s['roll_no']}")
            print(f"Marks: {s['marks']}")
            return

    print("Student not found.")

add_student("Arohi", 49, 95)
add_student("Vishal", 265, 85)
add_student("Ashwani", 59, 80)

print("\nAll Students:")
show_students()

roll = int(input("\nEnter Roll Number : "))
search_student(roll)



#add ,display , grade , avg , highest , is_pass for student management system

def calculate_Grade(marks):
    if marks >= 90:
        return 'A'
    elif marks >= 80:
        return 'B'
    elif marks >= 70:
        return 'C'
    elif marks >= 60:
        return 'D'
    else:
        return 'F'
    
#ADD GRADE IN DICTIONARY
print("Grades of students:")
for s in students:
    grade = calculate_Grade(s['marks'])
    print(f"Name: {s['name']}, Marks: {s['marks']}, Grade: {grade}")

def calculate_Average_and_Highest():
    if not students:
        return 0, 0
    total_marks = sum(s['marks'] for s in students)
    average = total_marks / len(students)
    highest = max(s['marks'] for s in students)
    return average, highest

average, highest = calculate_Average_and_Highest()
print(f"Average marks of students: {average:.2f}")
print(f"Highest marks: {highest}")

def is_Pass(marks):
    return marks >= 35
print("Pass/Fail status of students:")
for s in students:
    status = "Pass" if is_Pass(s['marks']) else "Fail"
    print(f"Name: {s['name']}, Marks: {s['marks']}, Status: {status}")
