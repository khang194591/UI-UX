import { Avatar, Box, Icon, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { useRef, useState } from 'react'
import { MdAddAPhoto } from 'react-icons/md'
import DashedBox from '../../../common/components/DashedBox'
import theme from '../../../theme'
import client from '../../../plugins/axios'

type AvatarUploadProps = {
  imageId?: string
}

function AvatarUpload({ imageId }: AvatarUploadProps) {
  const [id, setId] = useState(imageId)
  const inputFileRef = useRef<HTMLInputElement>(null)

  return (
    <DashedBox
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      borderRadius={2}
      p={4}
      color={blueGrey[500]}
    >
      {id ? (
        <Avatar
          onClick={() => inputFileRef.current?.click()}
          src={`${import.meta.env.VITE_APP_API_URL}/storage/${id}`}
          sx={{
            width: 120,
            height: 120,
            marginBlock: 4,
            outline: '1px dashed',
            outlineOffset: 8,
            cursor: 'pointer',
          }}
        />
      ) : (
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          width={120}
          height={120}
          borderRadius={999}
          bgcolor={blueGrey[100]}
          gap={0.5}
          my={4}
          onClick={() => inputFileRef.current?.click()}
          sx={{
            outline: '1px dashed',
            outlineOffset: 8,
            cursor: 'pointer',
          }}
        >
          <Icon component={MdAddAPhoto} sx={{ fontSize: 32 }} />
          <Typography sx={{ fontSize: theme.typography.fontSize }}>
            Upload photo
          </Typography>
        </Box>
      )}
      <input
        type="file"
        hidden
        name="file"
        ref={inputFileRef}
        onChange={async (e) => {
          const file = e.currentTarget.files?.item(0)
          if (file) {
            let fd = new FormData()
            fd.append('file', file)

            const res = await client.post('/storage/upload', fd, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            setId(res.data.id)
          }
        }}
      />
      <Typography>Allowed *.jpeg, *.jpg, *.png max size of 3MB</Typography>
    </DashedBox>
  )
}

export default AvatarUpload
