import React, { useRef, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { useGameStore } from '../store/useGameStore';

const STOCKFISH_HTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
</head>
<body>
    <script>
        var stockfish = new Worker('https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.wasm.js');
        stockfish.onmessage = function(event) {
            window.ReactNativeWebView.postMessage(event.data);
        };
        window.addEventListener('message', function(event) {
            stockfish.postMessage(event.data);
        });
        stockfish.postMessage('uci');
    </script>
</body>
</html>
`;

export const StockfishService = () => {
    const webViewRef = useRef<WebView>(null);
    const setBestMove = useGameStore(state => state.receiveAIMove);
    const setEvaluation = useGameStore(state => state.receiveEvaluation);

    // Communicate logic
    useEffect(() => {
        let lastFen = useGameStore.getState().game.fen();
        const unsubscribe = useGameStore.subscribe(
            (state) => {
                const fen = state.game.fen();
                if (fen !== lastFen) {
                  lastFen = fen;
                  if (state.mode === 'AI' && state.turn !== state.playerColor && !state.isGameOver) {
                    webViewRef.current?.postMessage(`position fen ${fen}`);
                    webViewRef.current?.postMessage(`go depth ${state.difficulty === 'Expert' ? 15 : 8}`);
                  }
                }
            }
        );
        return unsubscribe;
    }, []);


    const onMessage = (event: any) => {
        const data = event.nativeEvent.data;
        if (data.startsWith('bestmove')) {
            const move = data.split(' ')[1];
            setBestMove(move);
        } else if (data.includes('score cp')) {
            const cp = data.match(/score cp (-?\d+)/)?.[1];
            if (cp) setEvaluation(parseInt(cp) / 100);
        }
    };

    return (
        <WebView
            ref={webViewRef}
            originWhitelist={['*']}
            source={{ html: STOCKFISH_HTML }}
            javaScriptEnabled={true}
            onMessage={onMessage}
            style={{ width: 0, height: 0, opacity: 0 }}
        />
    );
};
