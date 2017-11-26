import {
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  SET_PROFILE_ID,
  CHANGE_FIELD,
  TOGGLE_PROFILE_MODE,
  EDIT_PROFILE_START,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  CHANGE_EDUCATION,
  CHANGE_SKILLS,
  UPLOAD_PROFILE_PICTURE,
  UPLOAD_PROFILE_PICTURE_PROGRESS,
  UPLOAD_PROFILE_PICTURE_COMPLETE,
  UPLOAD_PROFILE_PICTURE_ERROR
} from './types'
const uuidv1 = require('uuid/v1');

export const uploadProfilePicture = (file, userId) => {
  return {type: UPLOAD_PROFILE_PICTURE, file, userId};
};

export const uploadProfilePictureProgress = (progress) => {
  return {type: UPLOAD_PROFILE_PICTURE_PROGRESS, progress};
};

export const uploadProfilePictureComplete = () => {
  return {type: UPLOAD_PROFILE_PICTURE_COMPLETE};
};

export const uploadProfilePictureError = (error) => {
  return {type: UPLOAD_PROFILE_PICTURE_ERROR, error};
};

export const setPresentProfile = ({userId}) => {
  return {type: SET_PROFILE_ID, payload: userId}
};

export const profileRequested = (userId, authToken) => {
  console.log(authToken)
  return async (dispatch) => {
    try {
      dispatch({type: GET_PROFILE_START})

      let rawRes = await fetch(`/user/${userId}/profile`, {
        headers: {
          'auth_token': authToken
        }
      })
      let res = await rawRes.json()
      console.log(res)
      const averageRating = res.data.attributes['average-rating']
      const educationalAttributes = res.data.attributes['educations-attributes']
      const profile = res.data.attributes['profile']
      const reviews = res.data.attributes['reviews']

      return dispatch({type: GET_PROFILE_SUCCESS, payload: {averageRating, educationalAttributes, profile, reviews}})
    } catch (e) {
      console.log(e)
      return dispatch({type: GET_PROFILE_FAIL, payload: e})
    }
  }
}

// "user": {
// "role": "tutor",
// "first_name": "neeraj",
// "last_name": "chandra",
// "gender": "female",
// "birthday_date": "19/10/1992",
// "country": "US",
// "city": "london",
// "number": "8253667253",
// "email": "saurav@ss.com",
// "password": "12345678",
// "password_confirmation": "12345678",
// "skills":[
//     {
//         "id": 45,
//         "name": "javascript"
//     },
//     {
//         "id": 45,
//         "name": "javascript"
//     },
//     {
//         "id": 45,
//         "name": "javascript"
//     }],
// "provider": "facebook",
// "educations_attributes": {
//     "0":{
//         "id": 75,
//             "start_education": "11/09/1990",
//             "finish_education": "10/01/2016",
//             "university_name": "The school"
//         },
//     "1":{
//         "start_education": "16/05/1992",
//         "finish_education": "16/05/1996",
//         "university_name": "The second School"
//     }
// },
// "tutor_experience_attributes":{
//     "id": 42,
//     "rate": 20,
//     "experience": 5,
//     "description": ""
// }
// }

export const toggleProfileMode = (mode) => {
  return {
    type: TOGGLE_PROFILE_MODE,
    payload: mode
  }
}

export const onChangeUserInfo = (field, value) => {
  console.log(field)
  console.log(value)
  return {
    type: CHANGE_FIELD,
    payload: {field, value}
  }
}

export const onChangeEducation = (index, action, educationalAttributes, field, value) => {
  if (action === 'edit') {
    const updatedEducation = educationalAttributes.map((ed, i) => {
      if (i === index) {
        ed[field] = value
        return ed
      }
      return ed
    })
    return {
      type: CHANGE_EDUCATION,
      payload: updatedEducation
    }
  } else if (action === 'delete') {
    const updatedEducation = educationalAttributes.filter((ed, i) => {
      if (i === index) {
        return false
      }
      return true
    })
    return {
      type: CHANGE_EDUCATION,
      payload: updatedEducation
    }
  } else if (action = 'add') {
    let updatedEducation = educationalAttributes
    if (index > educationalAttributes.length) {
      const newEducation = {
        'start-education': '',
        'finish-education': '',
        'university-name': ''
      }
      updatedEducation = [...updatedEducation, newEducation]
    }

    return {
      type: CHANGE_EDUCATION,
      payload: updatedEducation
    }
  } else {
    return {
      type: CHANGE_EDUCATION,
      payload: educationalAttributes
    }
  }
}

export const onChangeSkill = (index, skillName, action, value, skills) => {
  if (action === 'delete') {
    const updatedSkills = skills.filter(skill => skill.name !== skillName)
    return {
      type: CHANGE_SKILLS,
      payload: updatedSkills
    }
  }
}

export const updateProfile = ({profile, userId, educationalAttributes, authToken}) => {
  return async (dispatch) => {
    try {
      dispatch({type: EDIT_PROFILE_START})

      console.log(authToken)

      let bodyObject = {
        "role": profile.type,
        "first_name": profile['full-name'].split(' ')[0],
        "last_name": profile['full-name'].split(' ')[1],
        "gender": profile.gender,
        "birthday_date": profile['birthday date'],
        "country": profile.country,
        "city": profile.city,
        "number": profile.phone,
        "email": profile.email,
        "skills": profile['skill-ids'],
        "educations_attributes": educationalAttributes,
      }

      console.log(JSON.stringify(bodyObject, null, 4))

      let resRaw = await fetch(`/user/${userId}`, {
        method: 'PUT',
        headers: {
          'auth_token': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject)
      })
      if (resRaw.status !== 200) {
        throw('failed request')
      }
      const res = await resRaw.json()
      const id = uuidv1()

      return dispatch({
        type: EDIT_PROFILE_SUCCESS,
        payload: {
          profileEditedIndicator: id,
          message: 'Your profile has been updated.'
        }
      })
    } catch (e) {
      console.log(e)
      const id = uuidv1()
      return dispatch({
        type: EDIT_PROFILE_FAIL,
        payload: {
          profileEditedIndicator: id,
          message: 'Sorry. Your profile could not be updated. Please try again.'
        }
      })
    }
  }
}