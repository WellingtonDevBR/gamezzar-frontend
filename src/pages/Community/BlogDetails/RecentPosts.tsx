import React from 'react'
import { BoxContainers, ContentContainer, Names, SubNames, SubNamess, Thumbnail, Thumbnails } from '../../Acitivity/styles'
import { Box } from '@mui/material'

const RecentPosts = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <BoxContainers>
                <Thumbnails src="https://source.unsplash.com/random" alt="Thumbnail" />
                <ContentContainer>
                    <Names>John Doe</Names>
                    <SubNamess>
                        Lorem ipsum dolor sit amet consectetur ..
                    </SubNamess>
                </ContentContainer>

            </BoxContainers>
            <BoxContainers>
                <Thumbnails src="https://source.unsplash.com/random" alt="Thumbnail" />
                <ContentContainer>
                    <Names>John Doe</Names>
                    <SubNamess>
                        Lorem ipsum dolor sit amet consectetur ...
                    </SubNamess>
                </ContentContainer>

            </BoxContainers>
            <BoxContainers>
                <Thumbnails src="https://source.unsplash.com/random" alt="Thumbnail" />
                <ContentContainer>
                    <Names>John Doe</Names>
                    <SubNamess>
                        Lorem ipsum dolor sit amet consectetur ..
                    </SubNamess>
                </ContentContainer>

            </BoxContainers>
            <BoxContainers>
                <Thumbnails src="https://source.unsplash.com/random" alt="Thumbnail" />
                <ContentContainer>
                    <Names>John Doe</Names>
                    <SubNamess>
                        Lorem ipsum dolor sit amet consectetur ..
                    </SubNamess>
                </ContentContainer>

            </BoxContainers>
        </Box>
    )
}

export default RecentPosts