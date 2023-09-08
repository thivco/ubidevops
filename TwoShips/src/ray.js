import {mat4_create, mat4_invert} from './mat4.js';
import {
  vec3_add,
  vec3_applyMatrix4,
  vec3_clone,
  vec3_create,
  vec3_cross,
  vec3_crossVectors,
  vec3_distanceTo,
  vec3_dot,
  vec3_multiplyScalar,
  vec3_subVectors,
  vec3_transformDirection,
} from './vec3.js';

const _diff = vec3_create();

const _edge1 = vec3_create();
const _edge2 = vec3_create();
const _normal = vec3_create();

// Mesh scope variables.
const _inverseMatrix = mat4_create();

const _intersectionPoint = vec3_create();

export var ray_create = (
    origin = vec3_create(),
    direction = vec3_create(),
) => ({
  origin,
  direction,
});

export var ray_copy = (a, b) => {
  Object.assign(a.origin, b.origin);
  Object.assign(a.direction, b.direction);
  return a;
};

export var ray_at = (ray, t, target = vec3_create()) =>
  vec3_add(
      vec3_multiplyScalar(Object.assign(target, ray.direction), t),
      ray.origin,
  );

export var ray_intersectBox = (ray, box, target) => {
  const {origin, direction} = ray;

  let txmin = (box.min.x - origin.x) / direction.x;
  let txmax = (box.max.x - origin.x) / direction.x;
  if (txmin > txmax) {
    [txmin, txmax] = [txmax, txmin];
  }

  let tymin = (box.min.y - origin.y) / direction.y;
  let tymax = (box.max.y - origin.y) / direction.y;
  if (tymin > tymax) {
    [tymin, tymax] = [tymax, tymin];
  }

  if (txmin > tymax || tymin > txmax) {
    return;
  }

  // Math.min/max with NaN support (0 / 0).
  let tmin = tymin > txmin || txmin !== txmin ? tymin : txmin;
  let tmax = tymax < txmax || txmax !== txmax ? tymax : txmax;

  let tzmin = (box.min.z - origin.z) / direction.z;
  let tzmax = (box.max.z - origin.z) / direction.z;
  if (tzmin > tzmax) {
    [tzmin, tzmax] = [tzmax, tzmin];
  }

  if (tmin > tzmax || tzmin > tmax) {
    return;
  }

  tmin = tzmin > tmin || tmin !== tmin ? tzmin : tmin;
  tmax = tzmax < tmax || tmax !== tmax ? tzmax : tmax;

  if (tmax < 0) {
    return;
  }

  return ray_at(ray, tmin >= 0 ? tmin : tmax, target);
};

export var ray_intersectTriangle = (ray, a, b, c, target) => {
  // Compute the offset origin, edges, and normal.
  // from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h
  vec3_crossVectors(
      _normal,
      vec3_subVectors(_edge1, b, a),
      vec3_subVectors(_edge2, c, a),
  );

  // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
  // E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
  //   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
  //   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
  //   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
  let DdN = vec3_dot(ray.direction, _normal);
  let sign = 1;

  if (DdN > 0) {
    return;
  } else if (DdN < 0) {
    sign = -1;
    DdN *= -1;
  } else {
    return;
  }

  vec3_subVectors(_diff, ray.origin, a);
  const DdQxE2 =
    sign * vec3_dot(ray.direction, vec3_crossVectors(_edge2, _diff, _edge2));

  // b1 < 0, no intersection
  if (DdQxE2 < 0) {
    return;
  }

  const DdE1xQ = sign * vec3_dot(ray.direction, vec3_cross(_edge1, _diff));

  // b2 < 0, no intersection
  if (DdE1xQ < 0) {
    return;
  }

  // b1+b2 > 1, no intersection
  if (DdQxE2 + DdE1xQ > DdN) {
    return;
  }

  // Line intersects triangle, check if ray does.
  const QdN = -sign * vec3_dot(_diff, _normal);

  // t < 0, no intersection
  if (QdN < 0) {
    return;
  }

  // Ray intersects triangle.
  return ray_at(ray, QdN / DdN, target);
};

const checkIntersection = (object, ray, a, b, c, point) => {
  const intersect = ray_intersectTriangle(ray, a, b, c, point);
  if (!intersect) {
    return;
  }

  return vec3_applyMatrix4(vec3_clone(point), object.matrixWorld);
};

const _ray = ray_create();

export var ray_intersectMesh = (ray, object) => {
  const intersections = [];

  _inverseMatrix.set(object.matrixWorld);
  ray_applyMatrix4(ray_copy(_ray, ray), mat4_invert(_inverseMatrix));

  const {vertices, faces} = object.geometry;

  faces.map((face, faceIndex) => {
    const a = vertices[face.a];
    const b = vertices[face.b];
    const c = vertices[face.c];

    const point = checkIntersection(object, _ray, a, b, c, _intersectionPoint);
    if (point) {
      intersections.push({
        point,
        object,
        face,
        faceIndex,
        distance: vec3_distanceTo(ray.origin, point),
      });
    }
  });

  return intersections;
};

export var ray_applyMatrix4 = (r, m) => {
  vec3_applyMatrix4(r.origin, m);
  vec3_transformDirection(r.direction, m);
  return r;
};

export var ray_intersectObjects = (ray, objects) =>
  objects
      .flatMap((object) => ray_intersectMesh(ray, object))
      .sort((a, b) => a.distance - b.distance);
