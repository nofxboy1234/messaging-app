import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// *** end-user tests ***
// renders a chat total count
// renders all the chats that the current user is a member of

// *** developer-user tests ***
// renders all the chats in the initialChats prop
// subscribes to the current users' chats channel
// unsubscribes on unmount
// when the subscription receives a chat, should render that chat
