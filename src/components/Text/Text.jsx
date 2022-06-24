import React from 'react'
import { StyleSheet, Text as RnText } from 'react-native'
import { presets } from './text.preset'

export default function Text({ children, style, preset = 'defautl' }) {
    const styleText = StyleSheet.compose(presets[preset], style)
    return (
        <RnText style={styleText}>{children}</RnText>
    )
}