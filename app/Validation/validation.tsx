export function validateUsername(username: string) {
    if (!username) {
        return 'Username is required'
    } else if (typeof username !== "string" || username.length < 3) {
      return `Username must be at least 3 characters long`;
    }
  }
  
  export function validateEmail(email: string) {
	if (!email) {
		return 'Email is Required'
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return 'Invalid Email Address'
	}
}
 
  export function validatePassword(password: string) {
    if (!password) {
		return 'Password is required'
	} else if (typeof password !== 'string' || password.length < 6) {
		return `Passwords must be at least 6 characters long`
	} else if (password.length > 0) {
		let PASSWORD_REGEX =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
		if (!PASSWORD_REGEX.test(password)) {
			return 'Minimum one lowercase, uppercase, number and special character required'
		}
	}
  }

export function validateConfirmPassword(password: string, cpassword: string) {
	if (!cpassword) {
		return 'Confirm Password is required'
	} else if (password !== cpassword) {
		return 'Password does not match'
	}
}

export function validatePhoneNumber(phoneNumber: number) {
	const pattern = /^\D*(\d\D*){9,14}$/;
	if (!phoneNumber) {
		return "Number is required"
	} else if (!phoneNumber.match(pattern)) {
		return "Phone number is invalid";
	}
  }