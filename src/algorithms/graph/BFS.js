import React from 'react';
import { fromDistance, cloneEdge, isNumber } from '../../common/utils';
import Graph from '../../common/graph';
import DrawGraph from '../../components/draw-graph/draw-graph';
import $ from 'jquery';
import Timer from '../../common/timer';
import { Colors } from '../../common/constants';

export default function (props) {
    return <DrawGraph {...props} start={start} />;
}

var queue;
var v, i, prev, k;
var delay = 500;

function start(source) {
    v = [source];
    queue = [];
    prev = [];
    i = source;
    Timer.timeout(() => {
        $('.vrtx').eq(i).attr('stroke', Colors.visited);
        $('.vrtx').eq(i).attr('fill', Colors.visited);
        Timer.timeout(visit, delay, 0);
    }, delay * 2);
}

function visit(j) {
    if (j < Graph.totalPoints()) {
        let ei = Graph.edgeIndex(i, j);
        if (isNumber(ei)) {
            if (v.indexOf(j) === -1) {
                $('.edge').eq(ei).attr('stroke', Colors.enqueue);
                $('.edge').eq(ei).attr('stroke-dasharray', '8,4');
                $('.vrtx').eq(j).attr('stroke', Colors.enqueue);
                queue.push(j);
                v.push(j);
                prev[j] = i;
                Timer.timeout(visit, delay, ++j);
            } else visit(++j);
        } else visit(++j);
    } else bfs();
}

function bfs() {
    if (queue.length) {
        $('.vrtx').eq(i).attr('fill', Colors.vertex);
        i = queue.shift();
        k = prev[i];
        let ei = Graph.edgeIndex(k, i);
        let { p, q, d } = cloneEdge(k, ei);
        Timer.timeout(span, delay * 2, p, q, d - 2);
    } else {
        $('.vrtx').eq(i).attr('fill', Colors.vertex);
    }
}

function span(p, q, d) {
    if (d > 0) {
        let r = fromDistance(p, q, d);
        $('line:last').attr('x2', r.x);
        $('line:last').attr('y2', r.y);
        Timer.timeout(span, 5, p, q, d - 2);
    } else {
        $('line:last').remove();
        let ei = Graph.edgeIndex(k, i);
        $('.edge').eq(ei).removeAttr('stroke-dasharray');
        $('.edge').eq(ei).attr('stroke', Colors.visited);
        $('.vrtx').eq(i).attr('stroke', Colors.visited);
        $('.vrtx').eq(i).attr('fill', Colors.visited);
        let j;
        let n = Graph.totalPoints();
        for (j = 0; j < n; j++) {
            let ei = Graph.edgeIndex(i, j);
            if (isNumber(ei)) {
                if (v.indexOf(j) === -1 || queue.indexOf(j) !== -1) {
                    Timer.timeout(visit, delay, 0);
                    break;
                }
            }
        }
        if (j === n) {
            Timer.timeout(bfs, delay);
        }
    }
}
