import axios from 'axios'
import { createRefresh } from 'react-auth-kit'

const refreshApi = createRefresh({
  interval: 10,
  refreshApiCallback: async ({ authToken, refreshToken }) => {
    try {
      const response = await axios.post(
        '/api/auth/refresh',
        { refresh_token: refreshToken },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      return {
        isSuccess: true,
        newAuthToken: response.data.access_token,
        newAuthTokenExpireIn: 15 * 60 * 1000,
        newRefreshToken: response.data.refresh_token,
        newRefreshTokenExpiresIn: 7 * 24 * 60 * 60 * 1000,
      }
    } catch (error) {
      console.error(error)
      return {
        isSuccess: false,
        newAuthToken: '',
      }
    }
  },
})

export default refreshApi
