// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

export type BestImage = {
    secure_url?: string;
    url?: string;
};

export function getDistanceBW2Points(point1: Record<string, any>, point2: Record<string, any>, xAttr = 'x', yAttr = 'y') {
    return Math.sqrt(Math.pow(point1[xAttr] - point2[xAttr], 2) + Math.pow(point1[yAttr] - point2[yAttr], 2));
}

/**
 * Funtion to return nearest point of given pivot point.
 * It return two points one nearest and other nearest but having both coorditanes smaller than the given point's coordinates.
 */
export function getNearestPoint(pivotPoint: {height: number; width: number}, points: never[], xAttr = 'x', yAttr = 'y') {
    let nearestPoint: Record<string, any> = {};
    const pivot = {[xAttr]: pivotPoint.width, [yAttr]: pivotPoint.height};
    for (const point of points) {
        if (typeof nearestPoint[xAttr] === 'undefined' || typeof nearestPoint[yAttr] === 'undefined') {
            nearestPoint = point;
        } else if (getDistanceBW2Points(point, pivot, xAttr, yAttr) < getDistanceBW2Points(nearestPoint, pivot, xAttr, yAttr)) {
            // Check for bestImage
            nearestPoint = point;
        }
    }
    return nearestPoint as BestImage;
}
