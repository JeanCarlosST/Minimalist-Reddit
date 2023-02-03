export function formatNumber(score) {
    let formatter = Intl.NumberFormat('en', { notation: 'compact' });
    return formatter.format(score);
}