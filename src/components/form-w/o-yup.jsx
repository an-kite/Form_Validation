import { useState } from "react"

const FormWithoutYup = () => {

    const [formData, setformData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "",
        interests: [],
        birthDate: "",
    })
    const [errors, setErrors] = useState();

    const isValidPassword = (password) =>{
        const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const numberRegex = /[0-9]/;
        const upperCaseRegex = /[A-Z]/;
        const lowerCaseRegex = /[a-z]/;
        return (
            password.length >= 8 &&
            symbolRegex.test(password) &&
            numberRegex.test(password) &&
            upperCaseRegex.test(password) &&
            lowerCaseRegex.test(password)
        );
    };
    const isValidEmail = (email) =>{
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    }
    const isValidPhoneNumber = (phoneNumber) =>{
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    }
    const isVAlidAge = (age) =>{
        return parseInt(age) >= 18 && parseInt(age) <= 100;
    }

    const validateForm = () =>{
        let newErrors = {};

        if(!formData.firstName){
            newErrors.firstName = "First name is required";
        }
        if(!formData.lastName){
            newErrors.lastName = "Last name is required";
        }
        if(!formData.email){
            newErrors.email = "Email is required";
        } else if(!isValidEmail(formData.email)){
            newErrors.email = "Invalid email format";
        }
        if(!formData.phoneNumber){
            newErrors.phoneNumber = "Phone number is required";
        } else if(!isValidPhoneNumber(formData.phoneNumber)){
            newErrors.phoneNumber = "Phone number must be 10 digits";
        }
        if(!formData.password){
            newErrors.password = "Password is required";
        } else if(!isValidPassword(formData.password)){
            newErrors.password = "Password must be atleast 8 characters long and contain at least one symbol, one number and one lowercase letter"
        }
        if(!formData.confirmPassword){
            newErrors.confirmPassword = "confirm password is required";
        } else if(formData.confirmPassword !== formData.password){
            newErrors.confirmPassword = "Password must match";
        }
        if(!formData.age){
            newErrors.age = "Age is required";
        } else if(!isVAlidAge(formData.age)){
            newErrors.age = "You must be at least 18 years old and not older than 100 years";
        }
        if(formData.gender){
            newErrors.gender = "Gender is reuired";
        }
        if(formData.interests.length == 0){
            newErrors.interests = "Select at least one interest";
        }
        if(!formData.birthDate){
            newErrors.birthDate = "Date of birth is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    
    console.log(errors);

    const handleSubmit = (e) => { 
        e.preventDefault();
        const isValid = validateForm();
        if(isValid){
            console.log("Form submitted", formData)
        }
        else{
            console.log("Form validation Failed")
        }
    }
    const handleChange = (e) =>{
        const {name, value} = e.target;

        setformData({
            ...formData,
            [name]:value
        })
    }
    const handleCheckBoxChange = (e) =>{
        const {name, checked} = e.target;
        let updatedInterests = [...formData.interests];
        if(checked){
            updatedInterests.push(name);
        }
        else{
            updatedInterests = updatedInterests.filter(
                (interest) => intersest !== name
            )
        }
        setformData({
            ...formData,
            interests: updatedInterests,
        });
    };
    return (
        <form className="form" onSubmit={handleSubmit} >
            <div> 
            <label>First Name:</label>
            <input type="text" name="firstName" 
            value={formData.firstName} 
            placeholder="Enter your first name" 
            onChange={handleChange}/>
            {/* {errors.firstName && <div className="error">{errors.firstName}</div>} */}
            </div>
            <div> 
            <label>Last Name:</label>
            <input type="text" name="lastName" 
            value={formData.lastName} 
            placeholder="Enter your last name" onChange={handleChange}/>
            {/* {errors.lastName && <div className="error">{errors.lastName}</div>} */}
            </div>
            <div> 
            <label>Email:</label>
            <input type="email" name="email"
            value={formData.email} 
            placeholder="Enter your mail" onChange={handleChange}/>
            {/* {errors.email && <div className="error">{errors.email}</div>} */}
            </div>
            <div> 
            <label>Phone Number:</label>
            <input type="text" name="phoneNumber"
            value={formData.phoneNumber} 
            placeholder="Enter your Phone" onChange={handleChange}/>
            {/* {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>} */}
            </div>
            <div> 
            <label>Password:</label>
            <input type="password" name="password"
            value={formData.password} 
            placeholder="Enter your Password" onChange={handleChange}/>
            {/* {errors.password && <div className="error">{errors.password}</div>} */}
            </div>
            <div> 
            <label>Confirm Password:</label>
            <input type="password" name="confirmPassword"
            value={formData.confirmPassword} 
            placeholder="Confirm Password" onChange={handleChange}/>
            {/* {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>} */}
            </div>
            <div> 
            <label>Age:</label>
            <input type="number" name="age"
            value={formData.age} 
            placeholder="Enter age" onChange={handleChange}/>
            {/* {errors.age && <div className="error">{errors.age}</div>} */}
            </div>
            <div> 
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            {/* {errors.gender && <div className="error">{errors.gender}</div>} */}
            </div>
            <div> 
            <label>Interests:</label>
            <label>
                <input
                  type="checkbox"
                  name="coding"  
                  checked={formData.interests.includes("coding")} 
                  onChange={handleCheckBoxChange}
                />
                Coding
            </label>
            <label>
                <input
                  type="checkbox"
                  name="sports"  
                  checked={formData.interests.includes("sports")} 
                  onChange={handleCheckBoxChange}
                />
                Sports
            </label>
            <label>
                <input
                  type="checkbox"
                  name="reading"  
                  checked={formData.interests.includes("reading")} 
                  onChange={handleCheckBoxChange}
                />
                Reading
            </label>
            {/* {errors.interests && <div className="error">{errors.interests}</div>} */}
            </div>
            <div>
                <label>Date of Birth</label>
                <input 
                type="date"
                name="birthDate"
                value={formData.birthDate}
                placeholder="Enter your DOB"
                onChange={handleChange}/>
                {/* {errors.birthDate && <div className="error">{errors.birthDate}</div>} */}
            </div>
            <button type="submit">Submit</button>
</form>
    )
}

export default FormWithoutYup