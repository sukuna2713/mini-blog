
import { GraphQLResult } from '@aws-amplify/api-graphql';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { Box, Button, styled, TextField } from "@mui/material";
import { CreateChatMessageInput, ListChatMessagesQuery } from './API';
import awsconfig from './aws-exports'
import { createChatMessage } from './graphql/mutations';
import { listChatMessages } from './graphql/queries';
import { ChatMessage } from './models';
import { SignOut } from './SignOut';

Amplify.configure(awsconfig)

/**
 * スタイル適用済のコンポーネント
 */
const StyledBox = styled(Box)(({ theme }) => ({
    margin: 16,
    height: 504,
    overflow: 'auto'
}))

const StyledMessage = styled('p')(({ theme }) => ({
    fontSize: 20,
    fontWeight: 'bold'
}))

const StyledFooter = styled(Box)(({ theme }) => ({
    margin: 16,
    marginLeft: 24,
    height: 64
}))

export const MyPage = () => {
    const [chatMessages, setChatMessages] = useState<CreateChatMessageInput[]>([])
    const [inputMessage, setInputMessage] = useState<string>('')

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        try {
            const messagesData = (
                await API.graphql(graphqlOperation(listChatMessages)
                )) as GraphQLResult<ListChatMessagesQuery>
            if (messagesData.data?.listChatMessages?.items) {
                const messages = messagesData.data.listChatMessages.items as CreateChatMessageInput[]
                setChatMessages(messages)
            }
        } catch (err) {
            console.log('error fetching todos')
        }
    }

    const saveMessage = async () => {
        try {
            // インプットに入力がないなら終了
            if (!inputMessage) return
            const message: CreateChatMessageInput = { message: inputMessage }
            setInputMessage('')
            setChatMessages([...chatMessages, message]);
            (await API.graphql(graphqlOperation(
                createChatMessage, { input: message }
            ))) as GraphQLResult<CreateChatMessageInput>
        } catch (err) {
            console.log('error sending message:', err)
        }
    }

    const sortMessage = (messages: ChatMessage[]) => {
        return [...messages].sort((p, v) =>
            new Date(p.createdAt!).getTime() - new Date(v.createdAt!).getTime()
        )
    }

    return (
        <div>
            <StyledBox>
                {chatMessages.map((message, index) => (
                    <Box
                        key={message.id ? message.id : index}
                        sx={{ color: 'text.primary' }}
                    >
                        <StyledMessage>{message.message}</StyledMessage>
                    </Box>
                ))}
            </StyledBox>
            <StyledFooter>
                <TextField
                    variant='outlined'
                    type='text'
                    color='primary'
                    size='small'
                    value={inputMessage}
                    sx={{ width: 300, marginRight: 8 }}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder='メッセージを入力'
                />
                <Button variant='contained' color='primary' onClick={() => saveMessage()}>
                    投稿
                </Button>
            </StyledFooter>
            <SignOut />
        </div>
    )
}