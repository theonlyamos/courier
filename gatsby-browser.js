import "@popperjs/core/dist/umd/popper.min"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"
import "firebase/storage"

export const onServiceWorkerUpdateReady = () => {
  window.location.reload()
  /*
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
  */
}
