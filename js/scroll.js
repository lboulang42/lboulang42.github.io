
document.addEventListener('DOMContentLoaded', function() {
    const fixedButton = document.getElementById('fixedButton');
    const textBlocks = document.querySelectorAll('.textBlock');

    function checkScrollPosition() {
        const nextBlock = getNextTextBlock();
        if (nextBlock) {
            fixedButton.style.display = 'flex'; 
        } else {
            fixedButton.style.display = 'none';
        }
    }

    function getNextTextBlock() {
        const scrollPosition = window.scrollY + window.innerHeight;
        for (let i = 0; i < textBlocks.length; i++) {
            const blockTop = textBlocks[i].offsetTop;
            if (blockTop > scrollPosition) {
                return textBlocks[i];
            }
        }
        return null;
    }

    fixedButton.addEventListener('click', function() {
        const nextBlock = getNextTextBlock();
        if (nextBlock) {
            nextBlock.scrollIntoView({ behavior: 'smooth' });
        }
    });

    window.addEventListener('scroll', checkScrollPosition);


    checkScrollPosition();
});