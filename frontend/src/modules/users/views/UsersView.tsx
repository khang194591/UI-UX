import { Button, Dialog, DialogContent, DialogTitle, Icon } from '@mui/material'
import { MdAdd } from 'react-icons/md'
import PageHeader from '../../../common/components/PageHeader'
import { PageName, mapLinkName } from '../../../common/utils'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import UserFormView from '../components/UserForm'
import UsersTable from '../components/UsersTable'
import { setUserFormData, setUserFormOpen } from '../user.store'

function UsersView() {
  const dispatch = useAppDispatch()
  const {
    userForm: { open, data },
  } = useAppSelector((state) => state.user)

  return (
    <div>
      <PageHeader
        pageName={mapLinkName[PageName.USER].name}
        rightSlot={
          <Button
            onClick={() => {
              dispatch(setUserFormData(undefined))
              dispatch(setUserFormOpen(true))
            }}
            startIcon={<Icon component={MdAdd} />}
          >
            New User
          </Button>
        }
      />
      <UsersTable />
      <Dialog
        maxWidth="lg"
        open={open}
        onClose={() => dispatch(setUserFormOpen(false))}
      >
        <DialogTitle>{data ? 'Update User' : 'Create User'}</DialogTitle>
        <DialogContent>
          <UserFormView />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UsersView
