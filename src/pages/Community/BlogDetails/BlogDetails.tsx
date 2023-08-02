import * as React from 'react';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import { PageNav, SubTitle, Title } from "./styles"
import { Container, Divider, TextField, TextareaAutosize, Typography } from '@mui/material';
import PopularTag from './PopularTag.tsx';
import RecentPosts from './RecentPosts.tsx';
import { Button } from '../../../components/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
const BlogDetails = () => {
    return (
        <Box sx={{ background: "#14141f" }}>
            <PageNav>
                <Title>Blog Details</Title>
                <SubTitle>Home/Community/Blog details</SubTitle>
            </PageNav>
            <Container>
                <Grid container spacing={8} sx={{ my: 3 }}>
                    <Grid item xs={8}>
                        <Typography variant="h6">The Most Played Game In The History</Typography>
                        <Box sx={{ height: '50px' }}></Box>
                        <Divider sx={{ backgroundColor: 'gray' }} />
                        {/* for top description row */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                            <Box>
                                <Typography variant="body1">Designer Interview</Typography>
                                <Typography variant='subtitle2' component="p" color="#aaa">Author chapter</Typography>
                            </Box>
                            <Box sx={{ width: '200px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                <Box>
                                    <Typography variant="body1">Writer</Typography>
                                    <Typography variant='subtitle2' component="p" color="#aaa">Rahul</Typography>
                                </Box>
                                <Box sx={{ height: '40px', width: '2px', backgroundColor: '#493CE0' }}></Box>
                                <Box>
                                    <Typography variant="body1">Date</Typography>
                                    <Typography variant='subtitle2' component="p" color="#aaa">August 2011</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ height: '400px', width: '100%', backgroundColor: 'grey', my: 2 }}></Box>
                        <Typography variant='h6'>What Is The Most Fun Thing To Become A Professional Gamer?</Typography>
                        <Typography variant='subtitle2' sx={{ my: 1 }} color="#aaa">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum nemo blanditiis libero possimus temporibus, cum esse doloremque eveniet, veritatis ipsum quidem asperiores quibusdam voluptatibus nesciunt voluptate debitis earum impedit inventore consequuntur minus autem consectetur ratione voluptatem? Doloribus adipisci, quae maxime necessitatibus id, quaerat ad ipsa vel velit placeat pariatur beatae.</Typography>
                        <Grid container spacing={2} my={1}>
                            <Grid item xs={6}>
                                <Box sx={{ height: '150px', width: '100%', backgroundColor: 'grey' }}></Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{ height: '150px', width: '100%', backgroundColor: 'grey' }}></Box>
                            </Grid>
                        </Grid>
                        <Typography variant='h6' mt={2}>How is your daily routine?</Typography>
                        <Typography variant='subtitle2' sx={{ my: 1 }} color="#aaa">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum nemo blanditiis libero possimus temporibus, cum esse doloremque eveniet, veritatis ipsum quidem asperiores quibusdam voluptatibus nesciunt voluptate debitis earum impedit inventore consequuntur minus autem consectetur ratione voluptatem? Doloribus adipisci, quae maxime necessitatibus id, quaerat ad ipsa vel velit placeat pariatur beatae.</Typography>
                        <Box sx={{ height: '230px', width: '100%', backgroundColor: 'grey', my: 2 }}></Box>
                        <Typography variant='h6' mt={2}>Middle Post Heading</Typography>
                        <Typography variant='subtitle2' sx={{ my: 1 }} color="#aaa">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum nemo blanditiis libero possimus temporibus, cum esse doloremque eveniet, veritatis ipsum quidem asperiores quibusdam voluptatibus nesciunt voluptate debitis earum impedit inventore consequuntur minus autem consectetur ratione voluptatem? Doloribus adipisci, quae maxime necessitatibus id, quaerat ad ipsa vel velit placeat pariatur beatae.</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                <Typography >Tags:</Typography><p style={{ color: 'gray', fontSize: '15px' }}>&nbsp;Bitcoin, wallet</p>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography >Share:</Typography>&nbsp;<FacebookIcon sx={{ height: '15px', width: '15px' }} />&nbsp;<TwitterIcon sx={{ height: '15px', width: '15px' }} />
                            </Box>
                        </Box>
                        <Box sx={{ height: '20px' }}></Box>
                        <Divider sx={{ backgroundColor: 'gray' }} />
                        <Typography variant="h6" my={3}>Leave a comment</Typography>
                        <Box component="form" gap={1}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TextField placeholder='Name*' sx={{ width: '100%', border: '1px  solid  grey', borderRadius: '5px', input: { 'color': 'gray' } }} />
                                <TextField placeholder='Email*' sx={{ width: '100%', border: '1px  solid  grey', ml: 2, borderRadius: '5px', input: { 'color': 'gray' } }} />
                            </Box>
                            {/* <TextField placeholder='Message'  sx={{width:'100%', border:'1px  solid  grey', borderRadius:'5px', mt:2, input:{'color':'gray', rows={3}}}}/>
                         */}
                            <Box sx={{ height: '10px' }}></Box>
                            <TextareaAutosize placeholder='Message' minRows={4} style={{
                                maxWidth: '100%',
                                width: '100%',
                                padding: '0.5rem',
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                background: "transparent",
                            }} />
                        </Box>
                        <Box sx={{ width: '150px', my: 2 }}>
                            <Button>Send Comment</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box>
                            <Typography variant="h6">Recent Post</Typography>
                            <RecentPosts />
                        </Box>
                        <Box>
                            <Typography variant="h6">Popular Tag</Typography>
                            <PopularTag />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
export default BlogDetails