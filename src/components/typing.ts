
export const constSecond = 5 as const

export const constTitle = 'Typing Game' as const

export type SECOND = typeof constSecond

export type TITLE = typeof constTitle
